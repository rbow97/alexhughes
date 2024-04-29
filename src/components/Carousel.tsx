import { useStore } from "@nanostores/react";

import type { Photo } from "../utils/sanity";
import { selectedCarouselItem } from "../selectedCarouselItem";
import { urlFor } from "../utils/image";

export function Carousel({ photos }: { photos: Photo[] }) {
  const $selectedCarouselItem = useStore(selectedCarouselItem);
  return (
    <section className="w-full mt-auto md:mt-[30px] ">
      <ul className="relative overflow-x-hidden snap-mandatory w-full">
        {photos &&
          photos.map((photo, index) => {
            return (
              <li key={photo.title} className="">
                {photo.image ? (
                  <img
                    className="object-contain col-span-4 md:col-span-12 mx-auto mt-auto md:mt-unset max-h-[700px]"
                    src={urlFor(photo.image).url()}
                    alt="Cover image"
                  />
                ) : (
                  <div className="post__cover--none" />
                )}
              </li>
            );
          })}
      </ul>
    </section>
  );
}
