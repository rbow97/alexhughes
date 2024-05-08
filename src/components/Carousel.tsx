
import { useStore } from "@nanostores/react";
import useCarousel from "../hooks/useCarousel";
import { selectedPhotoRef } from "../stores/selectedPhotoRefStore";
import { urlFor } from "../utils/image";
import type { FlattenedPhotosProps } from "../utils/sortedPhotos";

export const Carousel = ({ photos }: { photos: FlattenedPhotosProps[] }) => {
  const $selectedPhotoRef = useStore(selectedPhotoRef);
  
  const currentPhoto = $selectedPhotoRef
    ? photos.findIndex((photo) => photo._key === $selectedPhotoRef)
    : 0;

  const {currentPhotoInAlbum, currentAlbumLength, setCentralPhotoIndex, centralPhotoIndex} = useCarousel(photos, currentPhoto)


  const handlePhotoClick = (index: number) => {
    setCentralPhotoIndex(index);
  };

  return (
    <>
      <div className="grow mt-8 max-h-[700px]">
        <div className="pl-4 md:px-16 block gap-[10px] relative overflow-hidden h-full">
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
                className="pl-0 absolute max-w-[80vw] top-0 h-full object-contain transition-all duration-500 ease-in-out cursor-pointer"
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
