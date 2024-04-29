import type { Album, Photo } from "./sanity";

export interface CoverPhotoProps {
  album: string;
  coverPhoto: Photo;
  albumLength: number;
}

export function findCoverPhotos(albums: Album[]) {
  const coverPhotos: CoverPhotoProps[] = [];

  for (const album of albums) {
    const { album: albumName, photos } = album;
    const coverPhoto = photos.find((photo) => photo.cover);

    coverPhotos.push({
      album: albumName,
      albumLength: photos.length,
      coverPhoto: coverPhoto || photos[0],
    });
  }

  return coverPhotos;
}
