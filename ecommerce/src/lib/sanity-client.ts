import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || 'q3bwz1g1', // Lấy từ sanity.io
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || 'product', // thường là 'production'
    apiVersion: '2025-07-01', // Dùng ngày hôm nay
    useCdn: true, // CDN cho production
    token: process.env.SANITY_SECRET_TOKEN || 'skZjBNocJx5obW8ukIAPJog3sCddRhZUxWoAiFk4PIR4CQqbJKdXsB7oHBClJ7QgklwabetnTTAXFDKlQGPzANE1DmKST6KDemrIKNZEDW7t2TDeEV7a0fVlFTEWLGKONmutkPlAKwpcgZi1IUZ3PYlD0plMPuEGlSy12gj9kWZ509FQdABZ', // Chỉ cần khi write data
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)