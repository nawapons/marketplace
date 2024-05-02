import { executeQuery } from "@/app/nextauth/MySQLConnection";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
    const body = await req.formData();
    const dataString = body.get('data');
    const { product_name, product_detail, product_type, product_price, product_quantity } = JSON.parse(dataString);
   
    const product_img = body.get('product_img');
    const buffer = Buffer.from(await product_img.arrayBuffer());
    const filename = Date.now() + product_img.name.replaceAll(" ", "_")
    if (!product_name || !product_detail || !product_type || !product_price || !product_quantity || !product_img) {
        return NextResponse.json({ message: 'Missing some input data' }, { status: 400 }, { success: false })
    }
    try {
        const check = "SELECT * FROM products WHERE product_name = ?"
        const query = await executeQuery(check, [product_name])
        if (query.length > 0) {
            return NextResponse.json({ message: 'Product already exists' }, { status: 400 }, { sucess: false })
        }
        const insert = "INSERT INTO products (product_name,product_detail,product_type,product_price,product_quantity,product_img) VALUES (?,?,?,?,?,?)"
        const query2 = await executeQuery(insert, [
            product_name,
            product_detail,
            product_type,
            product_price,
            product_quantity,
            filename,
        ])
        if (query2.affectedRows === 1) {
            await writeFile(
                path.join(process.cwd(), "public/products/" + filename),
                buffer
            );
        }
        return NextResponse.json({ message: 'Product added successfully' }, { status: 201 }, { success: true })
    } catch (err) {
        return NextResponse.json({ message: 'Have some trouble, Please try again..' }, { status: 500 }, { success: false })
    }
}