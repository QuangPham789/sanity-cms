'use client';

import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useCartContext } from '@/context/StateContext';
import { urlFor } from '@/lib/sanity-client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface CartProps {
}

const Cart: React.FC<CartProps> = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const { cartItems, totalPrice, totalQuantities, setShowCart, toggleCartItemQuantity, onRemove } = useCartContext() as any;
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartItems }),
            });

            const data = await res.json();

            if (res.ok && data.id) {
                toast.success('Redirecting to Stripe...');
                await stripe?.redirectToCheckout({ sessionId: data.id });
            } else {
                toast.error('Failed to create checkout session.');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            toast.error('An error occurred during checkout.');
        }
    };


    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button type='button' onClick={() => setShowCart(false)} className='btn'>Continue Shopping</button>
                        </Link>
                    </div>
                )}
                <div className='product-container'>
                    {
                        cartItems.length >= 1 && cartItems?.map((item: any) => (
                            <div className='product' key={item._id}>
                                <img src={urlFor(item?.image[0]).url()} className='cart-product-image' alt={item.name} />
                                <div className='item-desc'>
                                    <div className='flex top'>
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className='flex bottom'>
                                        <div>
                                            <p className='quantity-desc'>
                                                <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                                                <span className='num'>{item.quantity}</span>
                                                <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                                            </p>
                                        </div>
                                        <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button type='button' className='btn' onClick={() => setShowCart(false)}>Continue Shopping</button>
                            <button type='button' className='btn' onClick={handleCheckout}>Pay with Stripe</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
export default Cart;