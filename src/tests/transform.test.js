import jest from "jest-mock";
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
import MyTransform from "../../transform.js";
import configValidation from "../../config.js";
import { createStreamCollection } from "../streams/index.js";

describe("First task examples", () => {
  const mockFilePathInput = "./input.txt";
  const mockFilePathOutput = "./output.txt";

  test("transform config 'C1-C1-R0-A'", () => {
    const config = "C1-C1-R0-A";
    const mockConfigArr = configValidation(config);
    // const collectionOfStreams = createStreamCollection(mockConfigArr);

    const mockReadable = new PassThrough();
    const mockWritable = new PassThrough();

    const mockcollectionOfStreams = jest.fn().mockImplementation(() => {
      return createStreamCollection(mockConfigArr);
    });
    // console.log('mock', mockcollectionOfStreams)

    // pipeline(mockReadable, ...mockcollectionOfStreams, mockWritable, err);
  });

  // test("check", async () => {
  //   const config = "C1-C1-R0-A";
  //   const mockConfigArr = configValidation(config);

  //   const cli_arguments = [
  //     FLAG_CONFIG,
  //     "C1-C1-R0-A",
  //     FLAG_INPUT,
  //     "./src/tests/input.txt",
  //     FLAG_OUTPUT,
  //     "./src/tests/output.txt",
  //   ];

  //   // const exitMock = jest.fn();

  //   // jest.spyOn(process, "exit").mockImplementation(() => {});

  //   // const checkErrorMessage = jest
  //   //   .spyOn(process.stderr, "write")
  //   //   .mockImplementation(() => {});

  //   // global.process = { ...realProcess, exit: exitMock };

  //   ciphering_cli(cli_arguments);
  //   // expect(checkErrorMessage).toHaveBeenCalledWith(OUTPUT_ERROR);
  //   // const user = {
  //   //   getFullName: jest.fn(() =>
  //   //     Promise.reject(new Error("Something went wrong"))
  //   //   ),
  //   // };
  //   // await expect(user.getFullName("Karl Hadwen")).rejects.toThrow(
  //   //   "Something went wrong"
  //   // );
  // });
});
