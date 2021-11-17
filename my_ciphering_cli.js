import {
  FLAG_CONFIG,
  FLAG_INPUT,
  FLAG_OUTPUT,
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

function ciphering_cli() {
  const args = process.argv;

  const config = getValue(args, FLAG_CONFIG);

  if (config) {
    const input = getValue(args, FLAG_INPUT) || null;
    const output = getValue(args, FLAG_OUTPUT) || null;

    const configArr = configValidation(config) || null;
    const collectionOfStreams = [];

    if (!Array.isArray(configArr)) {
      process.stderr.write(ERROR_TEXT);
    }

    const pathToFileInput = input ? path.join(__dirname, input) : null;
    const pathToFileOutput = output ? path.join(__dirname, output) : null;

    if (pathToFileInput) {
      fs.access(pathToFileInput, fs.F_OK, (err) => {
        if (err) {
          process.stderr.write("input file is not existed");
          process.exit(1);
        }
      });
    }

    if (pathToFileOutput) {
      fs.access(pathToFileOutput, fs.F_OK, (err) => {
        if (err) {
          process.stderr.write("output file is not existed");
          process.exit(1);
        }
      });
    }

    const read = createReadStream(pathToFileInput) || process.stdin;
    const write = createWriteStream(pathToFileOutput) || process.stdout

    for (let code of configArr) {
      const isEncoding = checkEncoding(code);
      const customStream = new MyTransform(code, isEncoding);
      collectionOfStreams.push(customStream);
    }

    pipeline(read, ...collectionOfStreams, write, (err) => {
       process.stderr.write(ERROR_TEXT);
       process.exit(1);
    });
  } else {
    process.stderr.write("There is no config");
    process.exit(1);
  }
}

ciphering_cli();
