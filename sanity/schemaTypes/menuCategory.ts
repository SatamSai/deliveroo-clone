import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Category",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'img',
      title: "Image",
      type: 'image',
    }),
  ],
})