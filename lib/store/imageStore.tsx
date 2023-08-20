import { create } from "zustand";

export type ImageData = {
  data: File;
  blob: string;
};

// TODO: Define the type for the state
type ImageHolderState = {
  images: ImageData[];
  addImage: (image: ImageData[]) => void;
  removeImage: (image: string) => void;
};

const useImageStore = create<ImageHolderState>((set) => ({
  images: [],
  addImage: (image: ImageData[]) =>
    set((state) => ({ images: [...state.images, ...image] })),
  setImages: (images: any) => set((state) => ({ images: images })),
  removeImage: (image: string) =>
    set((state) => ({
      images: state.images.filter((i: ImageData) => i.blob !== image),
    })),
}));

export default useImageStore;
