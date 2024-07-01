import { BookIcon, ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'gallery',
  title: 'Gallery',
  icon: BookIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'album',
      title: 'Album Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'photos',
      title: 'Photos',
      description: 'Upload photos',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              type: 'image',
              icon: ImageIcon,
              name: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              type: 'boolean',
              name: 'cover',
              title: 'Cover Photo',
              description: 'Select this photo as the cover photo for the album',
            }),
          ],
          preview: {
            select: {
              imageUrl: 'image.asset.url',
              title: 'image.asset.originalFilename',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'album',
    },
  },
});
