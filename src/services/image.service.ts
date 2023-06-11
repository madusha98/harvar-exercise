import Jimp from "jimp";
import mergeImg from "merge-img";
import { writeFile } from "fs";
import { join } from "path";

export class ImageService {
  static async mergeImages(images: Buffer[]): Promise<Jimp> {
    /**
     * TODO: fix the type issue here
     */
    // @ts-ignore
    return mergeImg(
      images.map((image) => ({ offsetX: 0, offsetY: 0, src: image }))
    );
  }

  static async saveImage(
    image: Jimp,
    path: string = `/cat-card.jpg`
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      image.getBuffer("image/jpeg", (err, buffer) => {
        if (err) {
          console.log(err);
          reject();
        }

        const fileOut = join(process.cwd(), path);

        writeFile(fileOut, buffer, "binary", (err) => {
          if (err) {
            console.log(err);
            reject();
            return;
          }

          console.log("The file was saved!");
          resolve();
        });
      });
    });
  }
}
