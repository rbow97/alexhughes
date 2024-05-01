import { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";
import { selectedPhotoRef } from "../stores/selectedPhotoRefStore";
import { urlFor } from "../utils/image";
import type { FlattenedPhotosProps } from "../utils/sortedPhotos";

export const Carousel = ({ photos }: { photos: FlattenedPhotosProps[] }) => {
  const $selectedPhotoRef = useStore(selectedPhotoRef);

  const currentPhoto = $selectedPhotoRef
    ? photos.findIndex((photo) => photo._key === $selectedPhotoRef)
    : 0;

  const [centralPhotoIndex, setCentralPhotoIndex] = useState(0);
  const [currentPhotoInAlbum, setCurrentPhotoInAlbum] = useState(0);
  const [currentAlbumLength, setCurrentAlbumLength] = useState(
    photos.filter(
      (photo) => photo.albumTitle === photos[centralPhotoIndex]?.albumTitle
    ).length
  );

  useEffect(() => {
    setCentralPhotoIndex(currentPhoto);
  }, []);

  useEffect(() => {
    // Get the album title of the central photo
    const centralPhotoAlbumTitle = photos[centralPhotoIndex]?.albumTitle;

    // Find all photos with the same album title
    const photosWithSameAlbumTitle = photos.filter(
      (photo) => photo.albumTitle === centralPhotoAlbumTitle
    );

    // Find the position of the central photo within the subset of photos with the same album title
    const centralPhotoIndexInAlbum = photosWithSameAlbumTitle.findIndex(
      (photo) => photo._key === photos[centralPhotoIndex]?._key
    );

    // Set the state variable with the position of the central photo within the album
    setCurrentPhotoInAlbum(centralPhotoIndexInAlbum + 1);
    setCurrentAlbumLength(photosWithSameAlbumTitle.length);
  }, [centralPhotoIndex]);

  const handlePhotoClick = (index: number) => {
    setCentralPhotoIndex(index);
  };

  return (
    <>
      <div className="grow mt-8 max-h-[700px]">
        <div className="px-16 relative overflow-hidden h-full">
          {photos?.map((photo, index) => {
            const toRight = index > centralPhotoIndex;
            const toLeft = index < centralPhotoIndex;
            const isNext = index === centralPhotoIndex + 1;
            const isPrev = index === centralPhotoIndex - 1;
            const leftValue = toLeft ? "0%" : toRight ? "100%" : "50%";
            const transformValue = toLeft
              ? `translateX(calc((-100% * ${
                  isPrev ? 1 : centralPhotoIndex - index
                }) + 30px))`
              : toRight
              ? `translateX(calc((100% * ${isNext ? 0 : index}) - 30px))`
              : "translateX(-50%)";

            return (
              <img
                key={`${photo.title}-${index}`}
                src={urlFor(photo.image).url()}
                className="absolute max-w-[80vw] top-0 h-full object-contain transition-all duration-500 ease-in-out cursor-pointer"
                style={{
                  left: leftValue,
                  transform: transformValue,
                }}
                onClick={() => handlePhotoClick(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="p-4 md:p-7 flex justify-between mt-auto">
        <h2 className="text-[18px] md:text-[32px]">
          {photos[centralPhotoIndex].albumTitle}
        </h2>
        <p className="flex gap-7 md:gap-14 text-[18px] md:text-[32px]">
          <span>{currentPhotoInAlbum}</span> <span>{currentAlbumLength}</span>
        </p>
      </div>
    </>
  );
};
