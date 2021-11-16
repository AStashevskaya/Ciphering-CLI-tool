import {
  FLAG_CONFIG,
  FLAG_INPUT,
  FLAG_OUTPUT,
  ERROR_TEXT,
} from "./src/constants/index.js";
import { getValue, checkEncoding } from "./src/utils/index.js";
import configValidation from "./config.js";
import path, { dirname } from "path";
import MyTransform from "./transform.js";
import { pipeline } from "stream";

function ciphering_cli() {
  const args = process.argv;

  const config = getValue(args, FLAG_CONFIG);

  if (config) {
    const input = getValue(args, FLAG_INPUT) || null;
    const output = getValue(args, FLAG_OUTPUT) || null;

    const configArr = configValidation(config) || null;
    const collectionOfStreams = [];

    for (let code of configArr) {
      const isEncoding = checkEncoding(code);
      const customStream = new MyTransform(code, isEncoding);
      collectionOfStreams.push(customStream);
    }

    pipeline(process.stdin, ...collectionOfStreams, process.stdout, (err) => {
      console.log(`err, ${err}`);
    });

    // if (!Array.isArray(configArr)) {
    //    console.error(ERROR_TEXT);
    // }

    // const pathToFile = path.join(dirname, input)
  } else {
    console.error("There is no config");
  }
}

ciphering_cli();
