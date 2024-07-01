import type { Album, Photo } from './sanity';

export interface AlbumWithCoverPhotoProps {
  albumName: string;
  coverPhoto: Photo | null;
  albumLength: number;
  photos: Photo[];
}

export function returnAlbumWithCoverPhoto(albums: Album[]) {
  const albumWithCoverPhoto: AlbumWithCoverPhotoProps[] = [];

  for (const album of albums) {
    const { album: albumName, photos } = album;
    const coverPhoto = photos.find((photo) => photo.cover);

    albumWithCoverPhoto.push({
      albumName: albumName,
      albumLength: photos.length,
      coverPhoto: coverPhoto || null,
      photos: photos.reverse(),
    });
  }

  return albumWithCoverPhoto;
}
