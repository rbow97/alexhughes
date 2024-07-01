import type { Album } from './sanity';

export function sortAlbumsByDateCreated(albums: Album[]) {
  // Sort the albums by _createdAt date in ascending order
  const sortedAlbums = albums.sort((albumA, albumB) => {
    const dateA = new Date(albumA._createdAt).getTime();
    const dateB = new Date(albumB._createdAt).getTime();
    return dateA - dateB;
  });

  return sortedAlbums;
}
