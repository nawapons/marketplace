import { CardComponents } from '@/app/components/Card'
import { TableComponents } from '@/app/components/Table'
import React from 'react'

export default function page() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl">Create New Product</h1>
            <p className="text-sm text-gray-600 mb-2">Here you can add new product to your marketplace.</p>
            <hr className="mb-4" />
            <div className="flex mb-4 ">
                <div className="w-2/5 h-12">
                    <CardComponents />
                </div>
                <div className="w-3/5 h-12">
                    <TableComponents />
                </div>
            </div>
        </div>
    )
}
