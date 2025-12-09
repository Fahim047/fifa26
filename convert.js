import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/venues";
const outputDir = "./public/venues/optimized";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(inputDir).forEach((file) => {
  const inputPath = path.join(inputDir, file);
  const baseName = file.split(".")[0];

  sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(`${outputDir}/${baseName}.webp`);

  sharp(inputPath)
    .avif({ quality: 60 })
    .toFile(`${outputDir}/${baseName}.avif`);
});
