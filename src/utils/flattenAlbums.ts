import type { Album } from './sanity';

// Fix this so it sorts photos not just albums

export function flattenAlbums(albums: Album[]) {
  // Sort the albums by _createdAt
  albums.sort((albumA, albumB) => {
    return new Date(albumA._createdAt).valueOf() - new Date(albumB._createdAt).valueOf();
  });

  // Create an array of objects containing photo and album title
  const sortedPhotosWithAlbumTitle = albums.flatMap((album) => {
    const albumTitle = album.title;
    return album.photos.map((photo) => ({ photo, albumTitle }));
  });

  return sortedPhotosWithAlbumTitle;
}
