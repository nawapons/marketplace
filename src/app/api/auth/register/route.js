// pages/api/register.js
import { executeQuery } from "@/app/nextauth/MySQLConnection"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
export async function POST(req) {
    const body = await req.json();
    const { fullname, email, password } = body
    if (!fullname || !email || !password) {
        return NextResponse.json({ message: 'Missing some input data' }, { status: 400 }, { success: false })
    }
    try {
        const check = await executeQuery(
            "SELECT * FROM users WHERE email = ?", [email]
        );
        if (check.length > 0) {
            return NextResponse.json({ message: 'User Already exists' }, { status: 400 }, { success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await executeQuery(
            "INSERT INTO users (fullname, email, password,role) VALUES (?, ?, ?,?)",
            [fullname, email, hashedPassword, "User"]
        );
        if (result.affectedRows === 1) {
            return NextResponse.json({ message: '' }, { status: 201 }, { success: true })
        } else {
            return NextResponse.json({ message: 'Failed to Register user' }, { status: 500 }, { success: false })
        }
    } catch (error) {
        return NextResponse.json({ message: 'Failed to Register user' }, { status: 500 }, { success: false })
    }
}
