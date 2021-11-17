import { checkEncoding, checkLength, checkCipher } from "./src/utils/index.js";
import { ERROR_TEXT, ATBASH, CAESAR, ROT } from "./src/constants/index.js";

export default function configValidation(configStr) {
  if (!configStr || typeof configStr !== "string") {
    process.stderr.write(ERROR_TEXT);
    process.exit(1);
  }

  const errors = [];

  const configArray = configStr.split("-");

  for (let code of configArray) {
    const correctLength = checkLength(code);

    if (correctLength) {
      const isEncoding = checkEncoding(code);

      if (typeof isEncoding === "boolean" || code === "A") {
        const chipher = checkCipher(code);

        if (chipher === CAESAR || chipher === ATBASH || chipher === ROT) {
          continue;
        } else {
          errors.push(ERROR_TEXT);
          break;
        }
      } else {
        errors.push(ERROR_TEXT);
        break;
      }
    } else {
      errors.push(ERROR_TEXT);
      break;
    }
  }

  if (errors.length) {
    process.stderr.write(ERROR_TEXT);
    process.exit(1);
  }

  return configArray;
}
