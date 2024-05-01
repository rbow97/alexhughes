import type { Album, Photo } from "./sanity";

export interface FlattenedPhotosProps extends Photo {
  albumTitle?: string;
  albumLength?: number;
}

export function sortedPhotos(albums: Album[]) {
  // Sort the albums by _createdAt date in ascending order
  const sortedAlbums = albums.sort((albumA, albumB) => {
    const dateA = new Date(albumA._createdAt).getTime();
    const dateB = new Date(albumB._createdAt).getTime();
    return dateA - dateB;
  });

  // Flatten the photos array of each album and add albumName to each photo
  const flattenedPhotos: FlattenedPhotosProps[] = sortedAlbums.flatMap(
    (album) => {
      const albumTitle = album.title;
      const albumLength = album.photos.length;
      return album.photos.map((photo) => ({
        ...photo,
        albumTitle,
        albumLength,
      }));
    }
  );

  return flattenedPhotos.reverse();
}
