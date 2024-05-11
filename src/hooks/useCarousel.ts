import { useEffect, useState } from 'react';
import type { FlattenedPhotosProps } from '../utils/sortedPhotos';

export default function useCarousel(
  photos: FlattenedPhotosProps[],
  currentPhoto: number,
) {
  const [centralPhotoIndex, setCentralPhotoIndex] = useState(0);
  const [currentPhotoInAlbum, setCurrentPhotoInAlbum] = useState(0);
  const [currentAlbumLength, setCurrentAlbumLength] = useState(
    photos.filter((photo) => photo.albumTitle === photos[centralPhotoIndex]?.albumTitle)
      .length,
  );

  useEffect(() => {
    setCentralPhotoIndex(currentPhoto);
  }, []);

  useEffect(() => {
    // Get the album title of the central photo
    const centralPhotoAlbumTitle = photos[centralPhotoIndex]?.albumTitle;

    // Find all photos with the same album title
    const photosWithSameAlbumTitle = photos.filter(
      (photo) => photo.albumTitle === centralPhotoAlbumTitle,
    );

    // Find the position of the central photo within the subset of photos with the same album title
    const centralPhotoIndexInAlbum = photosWithSameAlbumTitle.findIndex(
      (photo) => photo._key === photos[centralPhotoIndex]?._key,
    );

    // Set the state variable with the position of the central photo within the album
    setCurrentPhotoInAlbum(centralPhotoIndexInAlbum + 1);
    setCurrentAlbumLength(photosWithSameAlbumTitle.length);
  }, [centralPhotoIndex]);

  return {
    centralPhotoIndex,
    currentPhotoInAlbum,
    currentAlbumLength,
    setCentralPhotoIndex,
  };
}
