import { atom } from 'nanostores';

export const selectedPhotoRef = atom<string | undefined>(undefined);

export const selectedPhotoIndex = atom<number>(0);

export const currentAlbumLength = atom<number | undefined>(undefined);
export const centralPhotoIndexInCurrentAlbum = atom<number | undefined>(undefined);

export const currentAlbum = atom<{
  albumLength: number | undefined;
  centralPhotoInAlbumIndex: number | undefined;
  albumName: string | undefined;
}>({ albumLength: undefined, centralPhotoInAlbumIndex: undefined, albumName: undefined });
