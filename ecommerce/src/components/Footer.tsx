'use client';

import React from 'react';
import Link from 'next/link';
import { AiOutlineInstagram, AiOutlineX } from 'react-icons/ai';
interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <div className='footer-container'>
            <p>2023 Ecommerce All rights reserved</p>
            <p className='icons'>
                <Link href="https://www.instagram.com" target="_blank">
                    <AiOutlineInstagram />
                </Link>
                <Link href="https://www.x.com" target="_blank">
                    <AiOutlineX />
                </Link>
            </p>
            <p className='logo'>
                <Link href="/">Ecommerce</Link>
            </p>
        </div>
    );
};
export default Footer;