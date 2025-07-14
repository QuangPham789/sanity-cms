export const productsQuery = `*[_type == "product"]`;
export const bannersQuery = `*[_type == "banner"]`;
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]`;