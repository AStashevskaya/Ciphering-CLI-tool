import {
  FLAG_CONFIG,
  FLAG_INPUT,
  FLAG_OUTPUT,
  FLAG_CONFIG_ABV,
  FLAG_OUTPUT_ABV,
  FLAG_INPUT_ABV,
  ERROR_TEXT,
} from "./src/constants/index.js";
import { getValue, checkEncoding } from "./src/utils/index.js";
import configValidation from "./config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import MyTransform from "./transform.js";
import { pipeline } from "stream";
import fs, { createReadStream, createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const checkPath = (address) =>
  address.startsWith(".") ? path.join(__dirname, address) : address;

function ciphering_cli() {
  const args = process.argv;

  const config = getValue(args, FLAG_CONFIG, FLAG_CONFIG_ABV);

  if (config) {
    const input = getValue(args, FLAG_INPUT, FLAG_INPUT_ABV) || null;
    const output = getValue(args, FLAG_OUTPUT, FLAG_OUTPUT_ABV) || null;

    const configArr = configValidation(config) || null;
    const collectionOfStreams = [];

    if (!Array.isArray(configArr)) {
      process.stderr.write(ERROR_TEXT);
      process.exit(1);
    }

    const pathToFileInput = input ? checkPath(input) : null;
    const pathToFileOutput = output ? checkPath(output) : null;

    if (pathToFileInput && !fs.existsSync(pathToFileInput)) {
      process.stderr.write("Input file is not existed");
      process.exit(1);
    }

    if (pathToFileOutput && !fs.existsSync(pathToFileOutput)) {
      process.stderr.write("Output file is not existed");
      process.exit(1);
    }

    const read = pathToFileInput
      ? createReadStream(pathToFileInput)
      : process.stdin;

    const write = pathToFileOutput
      ? createWriteStream(pathToFileOutput, { flags: "a" })
      : process.stdout;

    for (let code of configArr) {
      const isEncoding = checkEncoding(code);
      const customStream = new MyTransform(code, isEncoding);
      collectionOfStreams.push(customStream);
    }

    pipeline(read, ...collectionOfStreams, write, (err) => {
      if (err) {
        process.stderr.write("Ooops! Something goes wrong..");
        process.exit(1);
      }
    });
  } else {
    process.stderr.write("There is no config");
    process.exit(1);
  }
}

ciphering_cli();
