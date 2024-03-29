import { NextRequest, NextResponse } from "next/server";
import sharp from 'sharp';

export async function GET() {
  return NextResponse.json({ data: "yeet" });
}

export async function POST(req: NextRequest, res:NextResponse) {
  try {

    const body = await req.json();
    if(!body.base64String || !body.size) throw new Error('Missing required fields');
    const binaryData = Buffer.from(body.base64String, 'base64');

    const resizedGif = await sharp(binaryData,{animated:true})
      .resize({ width: body.size }) // Example resizing
      .toBuffer();

    // const optimizedGif = await imagemin.buffer(resizedGif, {
    //   plugins: [
    //     imageminGiflossy({
    //       optimizationLevel: 3,
    //       lossy: 80
    //     }),
    //   ],
    // });
    return NextResponse.json(
      { resizedGif },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to resize gif", error },
      { status: 404 }
    )
  }
}






// export async function POST(req: NextRequest) {
//   try {
//     // Assuming the GIF is sent in the request body
//     const originalGif = req.body.gif;

//     // Optional: Resize the GIF using Sharp
//     const resizedGif = await sharp(originalGif)
//       .resize({ width: 500 }) // Example resizing
//       .toBuffer();

//     // Optimize the GIF using Imagemin
//     const optimizedGif = await imagemin.buffer(resizedGif, {
//       plugins: [
//         imageminGiflossy({
//           optimizationLevel: 3,
//           lossy: 80
//         }),
//       ],
//     });

//     // Return the optimized GIF
//     NextResponse.status(200).send(optimizedGif);
//   } catch (error) {
//     NextResponse.status(500).send('Error processing GIF');
//   }
 
//   return NextResponse.json('')
// }
