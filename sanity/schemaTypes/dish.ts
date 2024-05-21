import {defineField, defineType} from 'sanity'

export const dish = defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Dish",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
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
      name: 'price',
      title: "Price",
      type: 'number',
    }),
  ],
})