'use client';
import Link from 'next/link';
import React from 'react';
import { urlFor } from '@/lib/sanity-client';

interface HeroBannerProps {
    banner: any
};

const HeroBanner: React.FC<HeroBannerProps> = ({ banner }: HeroBannerProps) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{banner.smallText}</p>
                <h3>{banner.midText}</h3>
                <h1>{banner.largeText1}</h1>
                <img src={urlFor(banner.image).url()} alt='headphones' className="hero-banner-image" />
                <div>
                    <Link href={`/product/${banner.product}`}>
                        <button type="button">{banner.buttonText}</button>
                    </Link>
                    <div className='desc'>
                        <h5>Description</h5>
                        <p>{banner.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;