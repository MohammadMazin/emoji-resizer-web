import CONSTANTS from "@/lib/constants";
import { cn } from "@/utils/cn";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";

type InfoProps = {
  message: string;
  className?: string;
};

const Info = ({ message, className = "" }: InfoProps) => {
  return (
    // <div className="bg-purple-950 px-2 py-4 rounded-xl flex gap-4 opacity-80 hover:opacity-100 transition-all">
    <div
      className={cn(
        "bg-purple-950 px-2 py-4 rounded-xl flex gap-4 opacity-80 hover:opacity-100 transition-all",
        className
      )}
    >
      <BsInfoCircle className="cursor-pointer" size={CONSTANTS.IconSize} />
      {message}
    </div>
  );
};

export default Info;
