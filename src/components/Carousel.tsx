import { useState } from "react";

import { urlFor } from "../utils/image";
import type { Photo } from "../utils/sanity";
import clsx from "clsx";

export const Carousel = ({ photos }: { photos: Photo[] }) => {
  const [centralPhotoIndex, setCentralPhotoIndex] = useState(0);

  const handlePhotoClick = (index: number) => {
    setCentralPhotoIndex(index);
  };

  return (
    <div className="grow mt-8">
      <div className="relative overflow-scroll snap-proximity h-full">
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
            ? `translateX(calc((100% * ${isNext ? 0 : index - 1}) - ${
                isNext ? "30px" : "0px"
              }))`
            : "translateX(-50%)";
          return (
            <img
              src={urlFor(photo.image).url()}
              className={clsx(
                "absolute max-w-[80vw] top-0 h-full object-contain transition-all duration-500 ease-in-out",
                { "cursor-pointer": index !== centralPhotoIndex }
              )}
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
