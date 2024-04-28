
"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FileInput } from "flowbite-react";
export function CardComponents() {
  return (
    <Card className="max-w-md">
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Product Name" value="Product name" />
          </div>
          <TextInput id="Product Name" type="text" placeholder="Input your product" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="type" value="Product type" />
          </div>
          <TextInput id="type" type="text" placeholder="Input your product type" required />
        </div>
        <div className="flex">
          <div className="w-1/2 mr-2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput id="price" type="number" placeholder="0.00฿" required />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Quantity" />
            </div>
            <TextInput id="quantity" type="number" placeholder="piece" required />
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
        </div>
        <Button type="submit">Add new product</Button>
      </form>
    </Card>
  );
}
