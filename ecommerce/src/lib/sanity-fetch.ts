import { bannersQuery, productsQuery } from "./queries"
import { client } from "./sanity-client"
import { cache } from 'react'
interface FetchOptions {
    cache?: boolean
    revalidate?: number
    tags?: string[]
}

// Generic fetch function với caching
export const fetchSanity = cache(async <T = any>(
    query: string,
    params: Record<string, any> = {},
    options: FetchOptions = {}
): Promise<T> => {
    const { cache: enableCache = true, revalidate, tags } = options

    try {
        const data = await client.fetch<T>(query, params, {
            cache: enableCache ? 'force-cache' : 'no-store',
            next: {
                revalidate: revalidate || false,
                tags: tags || []
            }
        })

        return data
    } catch (error) {
        console.error('Sanity fetch error:', error)
        throw new Error(`Failed to fetch data: ${error}`)
    }
})


export const fetchProducts = async () => {
    const products = await client.fetch(productsQuery);
    return products;
}

export const fetchBanners = async () => {
    const banners = await client.fetch(bannersQuery);
    return banners;
}

export const fetchProductBySlug = async (slug: string) => {
    const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
    return product;
}

export const fetchStory = async () => {
    const story = await client.fetch(`*[_type == "storyland"][0]`);
    return story;
}
