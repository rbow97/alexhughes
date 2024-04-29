import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getFolders(): Promise<Folder[]> {
  return await useSanityClient().fetch(groq`*[_type == "folder"]`);
}

export async function getPostsForFolder(reference: string): Promise<Post[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && folder._ref == $reference]`,
    {
      reference,
    }
  );
}

export async function getFolder(reference: string): Promise<Folder> {
  return await useSanityClient().fetch(
    groq`*[_type == "folder" && _id == $reference][0]`,
    {
      reference,
    }
  );
}

export async function getSettings(): Promise<Settings> {
  return await useSanityClient().fetch(groq`*[_type == "settings"][0] {
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
  }`);
}

export interface Settings {
  _type: "settings";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
  tag: string;
  folder: { _ref: string; _type: string };
}

export interface Folder {
  _type: "folder";
  name: string;
  _updatedAt: string;
  _createdAt: string;
  _id: string;
}
