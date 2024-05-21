import {defineField, defineType} from 'sanity'

export const featured = defineType({
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Featured",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: "Description",
      type: 'string',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'restaurants',
      title: "Restaurants",
      type: 'array',
      of:[
        {
            type:"reference",
            to:[
                {
                    type:"restaurant"
                }
            ]
        }
      ]
    }),
  ],
})