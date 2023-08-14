import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import { ImCross } from "react-icons/im";

type ImagePreviewProps = {
  file: any;
  onClick?: any;
  size: number;
};

const ImagePreview = ({ file, size, onClick }: ImagePreviewProps) => {
  const { removeImage } = useImageStore();

  const handleClick = (event: any, file: any) => {
    event.stopPropagation();
    removeImage(file);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={(e) => handleClick(e, file)}
          className="bg-red-500 absolute p-2 rounded-xl hover:bg-red-700 cursor-pointer"
        >
          <ImCross color="#FFF" size={12} />
        </div>
        <Image
          className="file"
          alt="emote"
          src={file}
          width={size}
          height={size}
          onClick={onClick}
        />
      </div>
    </>
  );
};

export default ImagePreview;
