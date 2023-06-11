import "dotenv/config";
import minimist from "minimist";
import { CatService } from "./services/cat.service.js";
import { ImageService } from "./services/image.service.js";

const startTime = performance.now();

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = minimist(process.argv.slice(2));

async function main() {
  try {
    const promises = [greeting, who].map((text) =>
      CatService.fetchCatWithCustomText(text, {
        width,
        height,
        c: color,
        s: size,
        encoding: "binary",
      })
    );

    const images = await Promise.all(promises);

    const mergedImage = await ImageService.mergeImages(images);

    await ImageService.saveImage(mergedImage, "/generated/cat-card.jpg");
  } catch (e) {
    console.log(e.message);
  }
}

await main();

const endTime = performance.now();

console.log(`Genetation of cat image took ${endTime - startTime} milliseconds`);
