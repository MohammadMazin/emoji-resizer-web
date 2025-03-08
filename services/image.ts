import pica from "pica";

export async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        console.error("canvas.toBlob returned null");
        resolve(new Blob());
      }
    }, "image/png");
  });
}

export async function resizeImage(
  image: HTMLImageElement,
  size: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const p = pica();
  await p.resize(image, canvas, { unsharpAmount: 80, unsharpRadius: 0.6 });

  return canvas;
}

export function arrayBufferToBase64(arrayBuffer: any) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = url;
  });
}

export async function getBlobFromURL(blobURL: string) {
  const response = await fetch(blobURL);
  const blob = await response.blob();
  return blob;
}
