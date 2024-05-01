import { selectedPhotoRef } from "../../../stores/selectedPhotoRefStore";
import { urlFor } from "../../../utils/image";
import type { Photo } from "../../../utils/sanity";

export function Image({ photo }: { photo: Photo; index: number }) {
  return (
    <div
      onClick={() => selectedPhotoRef.set(photo._key)}
      className="h-[164px] md:h-[320px] flex items-center justify-center mx-4"
    >
      <img
        className="object-contain h-full max-h-[140px] md:max-h-[240px] hover:opacity-40 transition-opacity duration-500 ease-in-out"
        src={urlFor(photo.image).url()}
        alt="Cover image"
      />
    </div>
  );
}
