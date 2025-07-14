'use client';

import { urlFor } from '@/lib/sanity-client';
import Link from 'next/link';
import React from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    slug: {
        current: string;
    };
    image?: Array<{
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
        hotspot?: any;
    }>;
}

interface ProductProps {
    product: Product;
}

const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
    return (
        <div>
            <Link href={`/product/${product.slug.current}`}>
                <div className="product-card">
                    <img src={urlFor(product.image && product.image[0]).url()} width={250} height={250} className='product-image' />
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                </div>
            </Link>
        </div>
    );
};
export default Product;