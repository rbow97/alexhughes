import { selectedPhotoRef } from "../../../stores/selectedPhotoRefStore";

export function CurrentPhoto({
  imageSrc,
  imageKey,
  hoverImageSrc,
  photoUrls,
}: {
  imageSrc: string;
  imageKey: string;
  hoverImageSrc: string;
  photoUrls: string;
}) {
  return (
    <div onClick={() => selectedPhotoRef.set(imageKey)}>
      <img
        src={imageSrc}
        alt="Current photo"
        id="currentPhoto"
        className="max-h-[350px] md:max-h-[unset] md:group-hover:opacity-0 object-contain"
        data-photo-urls={photoUrls}
      />
      <div className="hidden md:block absolute inset-0 group-hover:opacity-100 -z-10 group-hover:z-10">
        <img
          id="hoverPhoto"
          className="object-contain h-full w-full"
          src={hoverImageSrc}
        />
      </div>
    </div>
  );
}
