import { create } from "zustand";

export type ImageData = {
  data: File;
  blob: string;
  selected: boolean;
};

type ImageHolderState = {
  images: ImageData[];
  addImage: (image: ImageData[]) => void;
  removeImage: (image: string) => void;
  updateImageSelected: (image: string) => void;
  removeAllImages: () => void;
};

const useImageStore = create<ImageHolderState>((set) => ({
  images: [],
  addImage: (image: ImageData[]) =>
    set((state) => ({ images: [...state.images, ...image] })),
  setImages: (images: any) => set((state) => ({ images: images })),
  updateImageSelected: (blob: string) =>
    set((state) => {
      const updatedImages = state.images.map((image) =>
        image.blob === blob ? { ...image, selected: !image.selected } : image
      );
      return { images: updatedImages };
    }),
  removeImage: (image: string) =>
    set((state) => ({
      images: state.images.filter((i: ImageData) => i.blob !== image),
    })),
  removeAllImages: () => set((state) => ({ images: [] })),
}));

export default useImageStore;
