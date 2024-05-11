import { selectedPhotoRef } from '../../../stores/selectedPhotoRefStore';

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
        alt={imageKey}
        id="currentPhoto"
        className="max-h-[350px] object-contain md:max-h-[unset] md:group-hover:opacity-0"
        data-photo-urls={photoUrls}
      />
      <div className="absolute inset-0 -z-10 hidden group-hover:z-10 group-hover:opacity-100 md:block">
        <img
          id="hoverPhoto"
          className="h-full w-full object-contain"
          src={hoverImageSrc}
        />
      </div>
    </div>
  );
}
