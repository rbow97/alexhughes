import type { Album, Photo } from './sanity';
import { sortAlbumsByDateCreated } from './sortAlbumsByDateCreated';

export interface FlattenedPhotosProps extends Photo {
  albumTitle?: string;
  albumLength?: number;
}

export function sortedPhotos(albums: Album[]) {
  const sortedAlbums = sortAlbumsByDateCreated(albums);

  // Flatten the photos array of each album and add albumName to each photo
  const flattenedPhotos: FlattenedPhotosProps[] = sortedAlbums.flatMap((album) => {
    const albumTitle = album.title;
    const albumLength = album.photos.length;
    return album.photos.map((photo) => ({
      ...photo,
      albumTitle,
      albumLength,
    }));
  });

  return flattenedPhotos.reverse();
}
