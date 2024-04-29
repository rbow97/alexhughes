import { defineType } from "sanity";

export default defineType({
  name: "folder",
  title: "Folder",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
});