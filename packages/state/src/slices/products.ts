import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@scrapify/types"
import { PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    query: string
    fields: string
    page: string
    products: Product[]
}

const initialState: InitialStateType = {
    query: "",
    fields: "",
    page: "",
    products: [],
}

export const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        setFields: (state, action: PayloadAction<string>) => {
            state.fields = action.payload
        },
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload
        },
    }
})

export const { setProducts, setQuery, setFields, setPage } = productsSlice.actions
export default productsSlice.reducer