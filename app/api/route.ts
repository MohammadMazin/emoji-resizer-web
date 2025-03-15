import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

let tokenInfo: { token: string; setAt: Date } | undefined;

async function getToken(): Promise<string> {
  const isTokenValid =
    tokenInfo &&
    tokenInfo.setAt &&
    new Date().getTime() - tokenInfo.setAt.getTime() < 10 * 60 * 1000;

  if (tokenInfo && isTokenValid) return tokenInfo.token;

  console.log("making new token");

  const body = {
    clientId: process.env.SIRV_CLIENT_ID,
    clientSecret: process.env.SIRV_CLIENT_SECRET,
  };

  const res = await fetch("https://api.sirv.com/v2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (res.ok) return data.token;
  throw new Error(data.message);
}

async function getImageAsBlob(buffer: Buffer, sizes: number[]): Promise<Blob> {
  const DESIRED_WIDTH = Math.max(500, ...sizes);
  const imageWidth = await sharp(buffer)
    .metadata()
    .then((metadata) => metadata.width);

  if (imageWidth && imageWidth <= DESIRED_WIDTH) {
    return new Blob([buffer], { type: "image/gif" });
  }
  const resizedGif = await sharp(buffer, { animated: true })
    .resize({ width: DESIRED_WIDTH })
    .toBuffer();
  return new Blob([resizedGif], { type: "image/gif" });
}

// v2
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    if (!body.base64String || !body.sizes || !body.filename)
      throw new Error("Missing required fields");

    const binaryData = Buffer.from(body.base64String, "base64");
    const blob = await getImageAsBlob(binaryData, body.sizes);

    const sirvUploadUrl = `https://api.sirv.com/v2/files/upload?filename=%2FREST%20API%20Examples%2F${body.filename}.gif`;
    const sirvApiKey = await getToken();

    const formData = new FormData();
    formData.append("file", blob, "uploaded_image");

    const headers = {
      Authorization: `Bearer ${sirvApiKey}`,
      contentType: "image/gif",
    };

    const response = await fetch(sirvUploadUrl, {
      method: "POST",
      headers: headers,
      body: blob,
    });

    if (response.status === 200) {
      return NextResponse.json(
        { message: "File uploaded successfully", data: "" },
        { status: 200 }
      );
    } else {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (error) {
    console.info(`<SERVER>: Failed to upload file: ` + error);
    return NextResponse.json(
      { message: `Failed to upload file: ${JSON.stringify(error)}` },
      { status: 404 }
    );
  }
}

// v1
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    if (!body.base64String || !body.sizes)
      throw new Error("Missing required fields");

    const binaryData = Buffer.from(body.base64String, "base64");

    const resizedGifs = await Promise.all(
      body.sizes.map(async (size: number) => {
        return await sharp(binaryData, { animated: true })
          .resize({ width: size })
          .toBuffer();
      })
    );

    let resizedGifsWithSize = {};
    resizedGifs.forEach((gif: Buffer, index: number) => {
      resizedGifsWithSize = {
        ...resizedGifsWithSize,
        [body.sizes[index]]: gif,
      };
    });

    // const optimizedGif = await imagemin.buffer(resizedGif, {
    //   plugins: [
    //     imageminGiflossy({
    //       optimizationLevel: 3,
    //       lossy: 80
    //     }),
    //   ],
    // });
    return NextResponse.json(
      { resizedGifs: resizedGifsWithSize },
      { status: 200 }
    );
  } catch (error) {
    console.log("<SERVER>: Failed to resize gif: ", error);
    return NextResponse.json(
      { message: `Failed to resize gif: ${JSON.stringify(error)}` },
      { status: 404 }
    );
  }
}
