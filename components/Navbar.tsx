"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HoverEffect } from "./ui/CardHoverEffect";

// export default function Navbar() {
//   const pathname = usePathname();

//   return (
//     <nav>
//       <div className="flex flex-row justify-center items-cente mt-2">
//         <div className="flex flex-row items-center">
//           <Link
//             href="/"
//             className={`text-lg mr-4 transition-all hover:bg-yellow-500 hover:text-purple-950 font-bold py-1 px-4 rounded-xl ${
//               pathname === "/" ? "bg-yellow-600 text-white" : ""
//             }`}
//           >
//             Emotes
//           </Link>
//           <Link
//             href="/create-gif"
//             className="text-lg mr-4 transition-all hover:bg-yellow-600 hover:text-purple-950 font-bold py-1 px-4 rounded-xl"
//           >
//             Create Gif
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

export default function Navbar() {
  return (
    <div className="w-1/3 mx-auto px-8">
      <HoverEffect items={links} />
    </div>
  );
}
export const links = [
  {
    title: "Emotes",
    link: "/",
  },
  {
    title: "Create GIF",
    link: "/create-gif",
  },
];
