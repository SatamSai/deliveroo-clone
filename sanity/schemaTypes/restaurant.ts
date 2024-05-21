import {defineField, defineType} from 'sanity'

export const restaurant = defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Restaurant",
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
      name: 'img',
      title: "Image",
      type: 'image',
    }),
    defineField({
      name: 'rating',
      title: "Rating",
      type: 'number',
      validation: (Rule) => Rule.max(5).min(1).required().error("Enter valid rating"),
    }),
    defineField({
      name: 'genre',
      title: "Category",
      validation: Rule => Rule.required(),
      type:"reference",
      to:[{ type:"category"}]
    }),
    defineField({
      name: 'dishes',
      title: "Dishes",
      validation: Rule => Rule.required(),
      type:'array',
      of:[
        {
            type:"reference", 
            to:[
                {
                    type:"dish"
                }
            ]
        }
      ]
    }),
    defineField({
      name: 'latitude',
      title: "Latitude",
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: "Logitude",
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: "Address",
      type: 'string',
      validation: Rule => Rule.required()
    }),
  ],
})