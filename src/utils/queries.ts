import groq from "groq";

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
  }
`;
