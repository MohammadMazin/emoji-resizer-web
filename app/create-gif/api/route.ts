import { NextRequest, NextResponse } from "next/server";
import GIFEncoder from 'gifencoder';
import sharp from 'sharp';
import fs from 'fs';
import { createCanvas, Image } from 'canvas';

export async function GET() {
  return NextResponse.json({ data: "yeet" });
}

const base64ToBuffer = (base64) => {
    const base64Str = base64.split(';base64,').pop();
    return Buffer.from(base64Str, 'base64');
};

const processImage = async (base64Img) => {
    const imgBuffer = base64ToBuffer(base64Img);
    // Using sharp to resize the image or any other processing needed
    const processedBuffer = await sharp(imgBuffer)
        .resize(320, 240) // Example: resizing to 320x240. Adjust as needed.
        .toBuffer();
    return processedBuffer;
};

export async function POST(req: NextRequest, res:NextResponse) {
  try {

    const body = await req.json();

    console.log(body.base64Array.length)

    
    const encoder = new GIFEncoder(320, 240); // Adjust size as needed
    const stream = encoder.createWriteStream({ repeat: 0, delay: 500, quality: 10 })
        .pipe(fs.createWriteStream('output.gif'));

    encoder.start();

    const canvas = createCanvas(320, 240); // Adjust size as needed
    const ctx = canvas.getContext('2d');

    for (const base64Img of body.base64Array) {
        const processedBuffer = await processImage(base64Img);
        const img = new Image();
        img.src = processedBuffer;
        ctx.drawImage(img, 0, 0, 320, 240); // Adjust drawing sizes as needed
        encoder.addFrame(ctx);
    }

    encoder.finish();
    console.log('GIF created successfully!');

    return NextResponse.json(
      { resizedGif: encoder },
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
