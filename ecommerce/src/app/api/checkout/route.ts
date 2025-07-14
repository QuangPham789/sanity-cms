import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { urlFor } from '@/lib/sanity-client';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    try {
        const { items } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items provided' }, { status: 400 });
        }

        // const lineItems = items.map((item: any) => ({
        //     price_data: {
        //         currency: 'usd',
        //         product_data: {
        //             name: item.name,
        //             images: item.image ? [item.image[0].asset.url] : [],
        //         },
        //         unit_amount: item.price * 100, // Convert to cents
        //     },
        //     quantity: item.quantity,
        // }));
        const lineItems = items.map((item: any) => {
            const imageUrl = item.image?.[0] ? urlFor(item.image[0]).toString() : undefined;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: imageUrl ? [imageUrl] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}