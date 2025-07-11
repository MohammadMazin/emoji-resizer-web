import html2canvas from "html2canvas";
import pica from "pica";
import posthog from "posthog-js";

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

export function downloadScreenshot(id: string) {
  posthog.capture(`${id}_screenshot_clicked`);
  downloadScreenshotHTML2Canvas(id);
}

export function downloadScreenshotHTML2Canvas(id: string) {
  const marginDiv = document.createElement("div");
  marginDiv.style.marginBottom = "5rem";

  const combinedDiv = document.createElement("div");
  combinedDiv.style.width = "500px";
  combinedDiv.style.background = "linear-gradient(to right, #8b19d1, #b5167b)";

  combinedDiv.style.padding = "1.5rem";
  combinedDiv.style.width = "max-content";
  const chats = document.getElementsByClassName(id);

  Array.from(chats).forEach((chat, index) => {
    const chatElement = chat.cloneNode(true) as HTMLElement;
    if (index === 0) chatElement.style.borderRadius = "0.5rem 0.5rem 0 0";
    if (index === chats.length - 1)
      chatElement.style.borderRadius = "0 0 0.5rem 0.5rem";

    combinedDiv.appendChild(chatElement);
  });

  document.body.appendChild(marginDiv);
  document.body.appendChild(combinedDiv);

  html2canvas(combinedDiv, {
    allowTaint: true,
    // scale: 1.5,
    useCORS: true,
    imageTimeout: 100,
    // height: combinedDiv.clientHeight,
    // width: combinedDiv.clientWidth,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `${id}-screenshot.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setTimeout(() => {
      document.body.removeChild(combinedDiv);
      document.body.removeChild(marginDiv);
    }, 1000);
  });
}

// leaving this here in case future me needs it

// export async function downloadScreenshotHTMLToImage(id: string) {
//   const combinedDiv = document.createElement("div");
//   combinedDiv.style.width = "500px";
//   combinedDiv.style.backgroundColor = "blue";
//   combinedDiv.style.padding = "1rem";
//   const chats = document.getElementsByClassName(id);

//   Array.from(chats).forEach((chat) => {
//     combinedDiv.appendChild(chat.cloneNode(true)); // cloneNode(true) keeps the content
//   });

//   document.body.appendChild(combinedDiv);

//   htmlToImage
//     .toJpeg(combinedDiv, { quality: 1, skipFonts: true })
//     .then(function (dataUrl) {
//       var link = document.createElement("a");
//       link.download = "my-image-name.jpeg";
//       link.href = dataUrl;
//       link.click();
//       document.body.removeChild(combinedDiv);
//     });

//   // toPng(combinedDiv, { skipFonts: true })
//   //   .then((dataUrl) => {
//   //     const link = document.createElement("a");
//   //     link.download = `${id}-screenshot.png`;
//   //     link.href = dataUrl;
//   //     link.click();

//   //     document.body.removeChild(combinedDiv);
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error capturing screenshot:", error);
//   //     document.body.removeChild(combinedDiv);
//   //   });
// }
