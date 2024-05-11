import { useStore } from '@nanostores/react';
import { currentAlbum } from '../../../stores/selectedPhotoRefStore';

export function LabelAndPosition() {
  const $currentAlbum = useStore(currentAlbum);

  return (
    <div className="mt-[30px] flex justify-between p-4 md:p-7">
      <h2 className="text-[18px] md:text-[32px]">{$currentAlbum.albumName}</h2>
      <p className="flex gap-7 text-[18px] md:gap-14 md:text-[32px]">
        <span>{$currentAlbum.centralPhotoInAlbumIndex}</span>{' '}
        <span>{$currentAlbum.albumLength}</span>
      </p>
    </div>
  );
}
