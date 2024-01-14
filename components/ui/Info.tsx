import CONSTANTS from "@/lib/constanst";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";

type InfoProps = {
  message: string;
};

const Info = ({ message }: InfoProps) => {
  return (
    <div className="bg-purple-950 px-2 py-4 rounded-xl my-2 flex gap-4 opacity-80 hover:opacity-100 transition-all">
      <BsInfoCircle className="cursor-pointer" size={CONSTANTS.IconSize} />
      {message}
    </div>
  );
};

export default Info;
