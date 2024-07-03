import { defineField, defineType } from 'sanity';
import { ColorWheelIcon } from '@sanity/icons';

export default defineType({
  name: 'colourTheme',
  title: 'Colour Theme',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Theme Name',
      type: 'string',
      description: 'The name of the colour theme (e.g., Red, White, etc.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      title: 'Background Colour',
      type: 'string',
      description: 'The hex background colour of the theme e.g. #FFFFFF',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textColour',
      title: 'Text Colour',
      type: 'string',
      description: 'The hex text colour of the theme e.g. #000000',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
