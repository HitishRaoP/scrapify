import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../input';
import { setProducts, setQuery } from '@scrapify/state/src/slices/products';
import { Button } from '../button';
import { RootState } from '@scrapify/state';
import { trpc } from "@scrapify/trpc-client"
import { toast, Toaster } from "react-hot-toast"
import { useCallback } from 'react';

export const QueryInput = () => {
    const dispatch = useDispatch();

    const handleInput = useCallback((query: string) => dispatch(setQuery(query)), [])

    const query = useSelector((state: RootState) => state.products.query)

    const handleSubmit = async () => {
        try {
            const data = await trpc.amazon.products.query({ query: query });
            dispatch(setProducts(data));
            toast.success("Products scraped successfully", {
                style: {
                    backgroundColor: "#0072F5",
                    color: "white"
                }
            })
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error(error);
        }
    };

    return (
        <div className='flex justify-between gap-4'>
            <Toaster />
            <Input placeholder='Search' onChange={(e) => handleInput(e.target.value)} />
            <Button variant={"outline"} onClick={handleSubmit} >
                Scrape
            </Button>
        </div>
    );
};
