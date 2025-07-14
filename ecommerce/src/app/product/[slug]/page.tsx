'use client';

import React, { useState, useEffect, use } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartContext } from '@/context/StateContext';
import { fetchProducts } from '@/lib/sanity-fetch';
import { urlFor } from '@/lib/sanity-client';
import Product from '@/components/Product';

type ProductType = {
    _id: string;
    name: string;
    slug: { current: string };
    image: any[];
    price: number;
    details: string;
};

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { incrementQty, decrementQty, qty, addToCart, setShowCart } = useCartContext() as any;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleBuyNow = () => {
        addToCart(product, qty);

        setShowCart(true);
    }

    const product = products.find((p) => p.slug?.current === slug);

    if (loading) return <div>Loading product...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <div className="product-detail-container">
                <div className="image-container">
                    <img
                        src={urlFor(product.image[index]).url()}
                        alt={product.name}
                        className="product-detail-image"
                    />
                    <div className="small-images-container">
                        {product.image.map((img, i) => (
                            <img
                                key={i}
                                src={urlFor(img).url()}
                                alt={`${product.name} thumbnail ${i}`}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{product.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{product.details}</p>
                    <p className="price">${product.price}</p>

                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decrementQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incrementQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>

                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={() => addToCart(product, qty)}
                        >
                            Add to Cart
                        </button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
