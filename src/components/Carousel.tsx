import { useEffect, useState } from "react";

import { urlFor } from "../utils/image";
import type { Photo } from "../utils/sanity";
import { selectedPhoto } from "../stores/selectedPhotoStore";
import { useStore } from "@nanostores/react";

export const Carousel = ({ photos }: { photos: Photo[] }) => {
  const $selectedPhoto = useStore(selectedPhoto);
  const [centralPhotoIndex, setCentralPhotoIndex] = useState(0);

  useEffect(() => {
    setCentralPhotoIndex($selectedPhoto);
  }, []);

  const handlePhotoClick = (index: number) => {
    setCentralPhotoIndex(index);
  };

  console.log($selectedPhoto);

  return (
    <>
      <div className="grow mt-8 max-h-[700px]">
        <div className="px-16 relative overflow-hidden h-full">
          {photos.map((photo, index) => {
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
      </div>
    </>
  );
};
