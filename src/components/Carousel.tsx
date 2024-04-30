import { useEffect, useState } from "react";

import { urlFor } from "../utils/image";
import type { Photo } from "../utils/sanity";

export const Carousel = ({ photos }: { photos: Photo[] }) => {
  const [centralPhotoIndex, setCentralPhotoIndex] = useState(
    photos[0].previousAlbum ? 1 : 0
  );

  const handlePhotoClick = (index: number) => {
    setCentralPhotoIndex(index);
  };

  return (
    <div className="grow mt-8">
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

          if (photo.albumTitle)
            return (
              <a key={photo.title} href={`/${photo.albumTitle.toLowerCase()}`}>
                <img
                  src={urlFor(photo.image).url()}
                  className="absolute max-w-[80vw] top-0 h-full object-contain transition-all duration-500 ease-in-out cursor-pointer"
                  style={{
                    left: leftValue,
                    transform: transformValue,
                  }}
                  onClick={() => handlePhotoClick(index)}
                />
              </a>
            );

          return (
            <img
              key={photo.title}
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
  );
};
