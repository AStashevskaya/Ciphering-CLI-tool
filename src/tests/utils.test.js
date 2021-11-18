import jest from "jest-mock";
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
import { ciphering_cli } from "../../chipher.js";

describe("Test cli arguments", () => {
  const realProcess = process;

  // afterEach(() => {
  //   global.process = realProcess;
  // });
  test("User passes no arguments;", () => {
    const values = getValue([], FLAG_CONFIG, FLAG_CONFIG_ABV);

    expect(values).toBeUndefined();
  });

  test("User passes the same cli argument twice;", () => {
    const exitMock = jest.fn();

    jest.spyOn(process, "exit").mockImplementation(() => {});

    const checkErrorMessage = jest
      .spyOn(process.stderr, "write")
      .mockImplementation(() => {});

    global.process = { ...realProcess, exit: exitMock };

    getValue([FLAG_CONFIG, FLAG_CONFIG], FLAG_CONFIG, FLAG_CONFIG_ABV);
    expect(exitMock).toHaveBeenCalledWith(1);
    expect(checkErrorMessage).toHaveBeenCalledWith(ARGUMENTS_ERROR);
    global.process = realProcess;
  });

  test("User doesn't pass -c or --config argument", () => {
    const cli_arguments = [
      FLAG_INPUT,
      "./input.txt",
      FLAG_OUTPUT,
      "./output.txt",
    ];

    const exitMock = jest.fn();

    jest.spyOn(process, "exit").mockImplementation(() => {});

    const checkErrorMessage = jest
      .spyOn(process.stderr, "write")
      .mockImplementation(() => {});

    global.process = { ...realProcess, exit: exitMock };

    ciphering_cli(cli_arguments);
    expect(exitMock).toHaveBeenCalledWith(1);
    expect(checkErrorMessage).toHaveBeenCalledWith(NO_CONFIG_ERROR);
  });

  test("User passes -i argument with path that doesn't exist or with no read access", () => {
    const cli_arguments = [
      FLAG_CONFIG,
      "C1-C1",
      FLAG_INPUT,
      "./src/input.txt",
      FLAG_OUTPUT,
      "./output.txt",
    ];

    const exitMock = jest.fn();

    jest.spyOn(process, "exit").mockImplementation(() => {});

    const checkErrorMessage = jest
      .spyOn(process.stderr, "write")
      .mockImplementation(() => {});

    global.process = { ...realProcess, exit: exitMock };

    ciphering_cli(cli_arguments);
    expect(exitMock).toHaveBeenCalledWith(1);
    expect(checkErrorMessage).toHaveBeenCalledWith(INPUT_ERROR);
  });

  test(
    "User passes incorrent symbols in argument for --config", () => {
      const cli_arguments = [
        FLAG_CONFIG,
        "C-C1"
      ];

      const exitMock = jest.fn();

      jest.spyOn(process, "exit").mockImplementation(() => {});

      const checkErrorMessage = jest
        .spyOn(process.stderr, "write")
        .mockImplementation(() => {});

      global.process = { ...realProcess, exit: exitMock };

      ciphering_cli(cli_arguments);
      expect(exitMock).toHaveBeenCalledWith(1);
      expect(checkErrorMessage).toHaveBeenCalledWith(ERROR_TEXT);
    }
  );

   test("User passes -o argument with path to directory that doesn't exist or with no read access", () => {
     const cli_arguments = [
       FLAG_CONFIG,
       "C1-C1",
       FLAG_INPUT,
       "./input.txt",
       FLAG_OUTPUT,
       "./src/output.txt",
     ];

     const exitMock = jest.fn();

     jest.spyOn(process, "exit").mockImplementation(() => {});

     const checkErrorMessage = jest
       .spyOn(process.stderr, "write")
       .mockImplementation(() => {});

     global.process = { ...realProcess, exit: exitMock };

     ciphering_cli(cli_arguments);
     expect(exitMock).toHaveBeenCalledWith(1);
     expect(checkErrorMessage).toHaveBeenCalledWith(OUTPUT_ERROR);
   });
});
