'use client';
import { useCartContext } from "@/context/StateContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { BsBagCheckFill } from "react-icons/bs";


export default function SuccessPage() {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useCartContext() as any;
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        localStorage.clear();
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        if (id) {
            setOrderId(id);
            // Clear cart after successful order
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);
        }
    }, [setCartItems, setTotalPrice, setTotalQuantities]);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email for the receipt.</p>
                {orderId && (
                    <p className="description">
                        Your order ID is: <span className="order-id">{orderId}</span>
                    </p>
                )}
                <p className="description">If you have any questions, please email us at
                    <a className="email" href="mailto:order@example.com" />
                </p>
                <Link href="/">
                    <button type="button" className="btn">
                        Continue Shopping
                    </button>
                </Link>

            </div>
        </div>);
}