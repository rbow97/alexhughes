import { sanityClient } from 'sanity:client';
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export async function getAlbum(id: string): Promise<Album> {
  return await sanityClient.fetch(groq`*[_type == "gallery" && _id == $id]`, {
    id,
  });
}

export async function getAlbums(): Promise<Album[]> {
  return await sanityClient.fetch(groq`*[_type == "gallery"]`);
}

export async function getSettings(): Promise<Settings> {
  return await sanityClient.fetch(groq`*[_type == "settings"][0] {
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
  }`);
}

export async function getPagesBySlugQuery(slug: string) {
  return await sanityClient.fetch(groq`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      body,
      overview,
      title,
      "slug": slug.current,
    }`, {
      slug
    }
  )
}

export interface Settings {
  _type: 'settings';
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

export interface Post {
  _type: 'post';
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
  tag: string;
  folder: { _ref: string; _type: string };
}

export interface Album {
  title: string;
  _updatedAt: string;
  photos: Photo[];
  album: string;
  _createdAt: string;
  _rev: string;
  _type: 'gallery';
  _id: string;
}

export interface Photo {
  cover: boolean;
  image: ImageAsset;
  _key: string;
  title: string;
}
