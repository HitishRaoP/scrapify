import axios from "axios";
import { JSDOM } from "jsdom";
import type { Product } from "@scrapify/types";

export function getQueryUrl(query: string, page: string | undefined) {
    const queryUrlBase = `https://www.amazon.in/s?k=${query}&page=${page}`;
    return queryUrlBase;
}

export async function getProducts(query: string, page: string | undefined) {
    query = query.replace(/%20/g, "+");
    const queryUrl = getQueryUrl(query, page);
    const { data } = await axios.get(queryUrl, {
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            Host: "www.amazon.in",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
            Pragma: "no-cache",
            TE: "Trailers",
            "Upgrade-Insecure-Requests": 1,
        },
    });
    const dom = new JSDOM(data);

    const products: Product[] = [];

    const results = dom.window.document.querySelectorAll(".s-result-item");

    results.forEach((element) => {
        const asin = element.getAttribute("data-asin");
        const titleElement = element.querySelector(".a-text-normal");
        const priceElement = element.querySelector(".a-price-whole");
        const imageElement = element.querySelector(".s-image");
        const mrpElement = element.querySelector(".aok-inline-block .a-text-price span");
        const peopleBoughtElement = element.querySelector(".s-title-instructions-style+ .a-spacing-top-micro .a-color-secondary");
        const deliveryDateElement = element.querySelector(".a-row+ .a-row .a-text-bold");
        const offerElement = element.querySelector(".a-letter-space+ span");
        const ratingsElement = element.querySelector(".s-link-style .s-underline-text");
        const reviewRatingElement = element.querySelector(".aok-align-bottom");

        if (asin && titleElement && priceElement && imageElement) {
            const title = titleElement.textContent?.trim() || "N/A";
            const price = priceElement.textContent?.trim() || "N/A";
            const imageUrl = imageElement.getAttribute("src") || "N/A";
            const mrp = mrpElement?.textContent?.trim() || "N/A";
            const peopleBought = peopleBoughtElement?.textContent?.trim() || "N/A";
            const deliveryDate = "Fastest Delivery by " + deliveryDateElement?.textContent?.trim() || "N/A";
            const offer = offerElement ? offerElement.textContent?.trim() : "N/A";
            const ratings = ratingsElement?.textContent?.trim() || "N/A";
            const review = reviewRatingElement?.textContent?.trim() || "N/A";

            products.push({
                source: "Amazon",
                asin: asin,
                url: `https://www.amazon.in/dp/` + asin,
                title: title,
                price: price,
                imageUrl: imageUrl,
                mrp: mrp,
                peopleBought: peopleBought,
                deliveryDate: deliveryDate,
                offer: offer,
                ratings: ratings,
                review: review,
            });
        }
    });

    return products || [];
}