import Image from "next/image";
import { ImCross } from "react-icons/im";

type ImagePreviewProps = {
  file: any;
  onClick: any;
  size: number;
};

const ImagePreview = ({ file, size, onClick }: ImagePreviewProps) => {
  return (
    <>
      <div className="relative">
        <div
          onClick={onClick}
          className="bg-red-500 absolute p-2 rounded-xl hover:bg-red-700 cursor-pointer"
        >
          <ImCross color="#FFF" />
        </div>
        <Image
          className="file"
          alt="emote"
          src={file}
          width={size}
          height={size}
        />
      </div>
    </>
  );
};

export default ImagePreview;
