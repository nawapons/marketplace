
"use client";

import axios from "axios";
import { Button, Alert, Card, Textarea, Label, TextInput } from "flowbite-react";
import { FileInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
export function CardComponents() {
  const [data, setData] = useState({
    product_name: "",
    product_detail: "",
    product_type: "",
    product_price: "",
    product_quantity: "",
  })
  const [img, setImg] = useState()
  const [error, setError] = useState("")
  const [success,setSuccess] = useState("")

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setImg();
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
    },
    preview: {
      marginTop: 15,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("product_img", img)
    try {
      const response = await axios.post("/api/product/insert", formData)
      if (response.status === 201) {
        setSuccess(response.data.message)
        setData({
          product_name: "",
          product_detail: "",
          product_type: "",
          product_price: "",
          product_quantity: "",
        })
        setImg()
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <Card className="max-w-md">
      <Alert color="info" className={"mb-3 " + (success === "" ? "hidden" : "")}>
        <span className="font-medium">Success</span> {success}.
      </Alert>
      <Alert color="failure" className={"mb-3 " + (error === "" || success != "" ? "hidden" : "")} icon={HiInformationCircle}>
        <span className="font-medium">{error}</span>
      </Alert>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Product Name" value="Product name" />
          </div>
          <TextInput onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="Product Name" name="product_name" type="text" placeholder="Input your product" required />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="detail" value="Product detail" />
          </div>
          <Textarea onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="detail" placeholder="Some detail....." name="product_detail" required rows={3} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="type" value="Product type" />
          </div>
          <TextInput onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="type" type="text" name="product_type" placeholder="Input your product type" required />
        </div>
        <div className="flex">
          <div className="w-1/2 mr-2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="price" type="number" name="product_price" placeholder="0.00฿" required />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Quantity" />
            </div>
            <TextInput id="quantity" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type="number" name="product_quantity" placeholder="piece" required />
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput onChange={imageChange} accept="image/*" name="product_image" id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
        </div>
        {img && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(img)}
              style={styles.image}
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button>
          </div>
        )}
        <Button type="submit">Add new product</Button>
      </form>
    </Card>
  );
}
