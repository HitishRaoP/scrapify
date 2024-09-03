import { TRPCError } from "@trpc/server";
import { productSchema } from "@scrapify/forms";
import { getProducts } from "@scrapify/scrapers"
import type { Product } from '@scrapify/types'
import { publicProcedure, router } from "../trpc";

export const amazonRouter = router({
    products: publicProcedure
        .input(productSchema)
        .query(async ({ input: { query, fields, page } }): Promise<Product[]> => {
            const fieldsArray = fields?.split(",") || [];
            if (!query) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Query parameter 'q' is required",
                })
            }

            try {
                const scrapedProducts = await getProducts(query, page);

                if (scrapedProducts.length === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "No products found"
                    })
                }

                let output = scrapedProducts;
                if (fieldsArray.length > 0) {
                    output = scrapedProducts.map((scrapedProduct) => {
                        const filteredProduct: Product = {};
                        fieldsArray.forEach((field: string) => {
                            if (scrapedProduct[field]) {
                                filteredProduct[field] = scrapedProduct[field];
                            }
                        });
                        return filteredProduct;
                    });
                }
                return output
            } catch ( error: unknown ) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Internal server error: ${error}`,
                })
            }
        })
})