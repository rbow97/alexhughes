import { selectedCarouselItem } from "../../../selectedCarouselItem";
import { urlFor } from "../../../utils/image";
import type { Photo } from "../../../utils/sanity";

export function Image({
  photoAndAlbumTitle,
}: {
  photoAndAlbumTitle: { photo: Photo; albumTitle: string };
}) {
  return (
    <div
      onClick={() => {
        selectedCarouselItem.set(1);
      }}
      className="h-[164px] md:h-[320px] flex items-center justify-center mx-4"
    >
      <a href={`/${photoAndAlbumTitle.albumTitle.toLowerCase()}`}>
        <img
          className="object-contain h-full max-h-[140px] md:max-h-[240px] hover:opacity-40 transition-opacity duration-500 ease-in-out"
          src={urlFor(photoAndAlbumTitle.photo.image).url()}
          alt="Cover image"
        />
      </a>
    </div>
  );
}
