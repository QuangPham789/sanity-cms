'use client';

import { urlFor } from '@/lib/sanity-client';
import { url } from 'inspector';
import Link from 'next/link';
import React from 'react';
interface FooterBannerProps {
    banner: any
}

const FooterBanner: React.FC<FooterBannerProps> = ({ banner }: FooterBannerProps) => {
    return (
        <div className='footer-banner-container'>
            <div className='banner-desc'>
                <div className='left'>
                    <p>{banner.discount}</p>
                    <h3>{banner.largeText1}</h3>
                    <h3>{banner.largeText2}</h3>
                    <p>{banner.saleTime}</p>
                </div>
                <div className='right '>
                    <p>{banner.smallText}</p>
                    <h3>{banner.midText}</h3>
                    <p className='extra-desc'>{banner.desc}</p>
                    <Link href={`/product/${banner.product}`}>
                        <button type='button'>{banner.buttonText}</button>
                    </Link>
                </div>

                <img src={urlFor(banner.image).url()} className='footer-banner-image' alt='footer banner' />
            </div>
        </div>
    );
};
export default FooterBanner;