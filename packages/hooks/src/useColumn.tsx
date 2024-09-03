"use client"
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { RootState } from "@scrapify/state"
import { type ColumnDef } from '@tanstack/react-table';
import { Product } from '../../types'

export const useColumn = () => {
    const [column, setColumn] = useState<ColumnDef<Product>[]>([])
    const products = useSelector((state: RootState) => state.products.products)
    
    useEffect(() => {
        if (products[0]) {
            const headers = Object.keys(products[0])
            const cols: ColumnDef<Product>[] = headers.map(header => ({
                accessorKey: header,
                header: header,
                cell: ({ row }) => {
                    if (header === "title") {
                        return (
                            <div className='line-clamp-2'>{row.getValue(header)}</div>
                        )
                    } else {
                        return (
                            <div>{row.getValue(header)}</div>
                        )
                    }
                }
            }))
            setColumn(cols)
        }
    }, [products])

    return column
}
