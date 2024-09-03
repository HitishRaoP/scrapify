"use client"
import { DataTable } from "../components/data-table"
import { useColumn } from "@scrapify/hooks"
import { useSelector } from "react-redux"
import { RootState } from "@scrapify/state"
import { QueryInput } from "../components/query-input"

export function ProductsTable() {
    const products = useSelector((state: RootState) => state.products.products)
    const columns = useColumn()

    return (
        <div className="container mx-auto pt-10 space-y-10">
            <QueryInput />
            <DataTable columns={columns} data={products} />
        </div>
    )
}
