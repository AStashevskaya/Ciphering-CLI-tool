import jest from "jest-mock";
import { fileURLToPath } from "url";
import { PassThrough, pipeline } from "stream";
import { getValue } from "../utils/index.js";
import {
  FLAG_CONFIG,
  FLAG_INPUT,
  FLAG_OUTPUT,
  FLAG_OUTPUT_ABV,
  FLAG_INPUT_ABV,
  FLAG_CONFIG_ABV,
  ERROR_TEXT,
  ARGUMENTS_ERROR,
  NO_CONFIG_ERROR,
  INPUT_ERROR,
  OUTPUT_ERROR,
} from "../constants/index.js";
import configValidation from "../../config.js";
import { createStreamCollection } from "../streams/index.js";
import { createWriteStream, createReadStream } from "fs";
import path, { dirname } from "path";
import { ciphering_cli } from "../../chipher.js";

describe("Success cases", () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const mockFilePathInput = path.join(__dirname, "./input.txt");
  const mockFilePathOutput = path.join(__dirname, "./output.txt");
  const outputText = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';

  test("config C1-C1-R0-A", () => {
    const cli_arguments = [
      FLAG_CONFIG,
      "C1-C1-R0-A",
      FLAG_INPUT,
      mockFilePathInput,
      FLAG_OUTPUT,
      mockFilePathOutput,
    ];
    const configArr = configValidation("C1-C1-R0-A");
    console.log(mockFilePathOutput);

    const read = createReadStream(mockFilePathInput);
    const write = createWriteStream(mockFilePathOutput);
    const collectionOfStreams = createStreamCollection(configArr);

    pipeline(read, ...collectionOfStreams, write, (err) => {
      if (err) {
        console.log(err);
      }
    });

    write.on("data", (buffer) => {
      expect(buffer.toString()).toEqual(outputText);
    });
  });

  test("config 'C1-C0-A-R1-R0-A-R0-R0-C1-A'", () => {
    const configArr = configValidation("C1-C0-A-R1-R0-A-R0-R0-C1-A");
    console.log(mockFilePathOutput);

    const read = createReadStream(mockFilePathInput);
    const write = createWriteStream(mockFilePathOutput);
    const collectionOfStreams = createStreamCollection(configArr);

    pipeline(read, ...collectionOfStreams, write, (err) => {
      if (err) {
        console.log(err);
      }
    });

    createReadStream(mockFilePathOutput).on("data", (buffer) => {
      expect(buffer.toString()).toEqual(outputText);
    });
  });

  test("config C1-R1-C0-C0-A-R0-R1-R1-A-C1", () => {
    const configArr = configValidation("C1-R1-C0-C0-A-R0-R1-R1-A-C1");
    console.log(mockFilePathOutput);

    const read = createReadStream(mockFilePathInput);
    const write = createWriteStream(mockFilePathOutput);
    const collectionOfStreams = createStreamCollection(configArr);

    pipeline(read, ...collectionOfStreams, write, (err) => {
      if (err) {
        console.log(err);
      }
    });

    createReadStream(mockFilePathOutput).on("data", (buffer) => {
      expect(buffer.toString()).toEqual(outputText);
    });
  });
});
