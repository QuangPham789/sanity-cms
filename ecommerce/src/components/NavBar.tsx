'use client';

import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useCartContext } from '@/context/StateContext';
interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = () => {
    const { showCart, setShowCart, totalQuantities } = useCartContext() as any;
    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link href="/">Ecommerce</Link>
            </p>
            <button type='button' className='cart-icon' onClick={() => setShowCart(!showCart)}>
                <AiOutlineShopping />
                <span className='cart-item-qty'>{totalQuantities}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};
export default NavBar;