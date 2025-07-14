import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be a positive number'),
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'text',
            validation: Rule => Rule.max(200).error('Details must be less than 200 characters'),
        }),
    ],
});