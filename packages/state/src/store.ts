import { configureStore } from "@reduxjs/toolkit"
import productsSlice from "./slices/products"

export const store = configureStore({
    reducer: {
        products: productsSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>