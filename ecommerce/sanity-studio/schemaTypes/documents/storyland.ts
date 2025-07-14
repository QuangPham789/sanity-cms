import { defineField, defineType } from "sanity";

export const story = defineType({
    name: "storyland",
    type: "document",
    title: "StoryLand",
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'embedUrl',
            title: 'EMBEDURL',
            type: 'url',
            validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
        }),
    ],
});