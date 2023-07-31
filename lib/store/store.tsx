import create from "zustand";

// TODO: Define the type for the state
type ImageHolderState = {
  images: any;
  addImage: (image: any) => void;
  removeImage: (image: any) => void;
};

const useImageStore = create<ImageHolderState>((set) => ({
  images: [],
  addImage: (image) => set((state) => ({ images: [...state.images, image] })),
  removeImage: (image) =>
    set((state) => ({ images: state.images.filter((i: any) => i !== image) })),
}));

export default useImageStore;
