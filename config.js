import { checkEncoding, checkLength, checkCipher } from "./src/utils/index.js";
import { ERROR_TEXT, ATBASH, CAESAR, ROT } from "./src/constants/index.js";
console.log(process.argv)

function configValidation(configStr) {
  if (!configStr || typeof configStr !== "string") {
    console.error(ERROR_TEXT);
  }

  const configArray = configStr.split("-");
  console.log("configArray", configArray);

  for (let code of configArray) {
    const correctLength = checkLength(code);
    console.log("correctLength", correctLength);
    if (correctLength) {
      const isEncoding = checkEncoding(code);
      console.log("isEncoding", isEncoding);

      if (typeof isEncoding === "boolean" || code === "A") {
        const chipher = checkCipher(code);

        switch (chipher) {
          case CAESAR:
            console.log(CAESAR);
            CAESAR;
            continue;
          case ATBASH:
            console.log(ATBASH);
            continue;
          case ROT:
            console.log(ROT);
            continue;
          default:
            console.log(ERROR_TEXT);
            break;
        }
      } else {
        console.error(ERROR_TEXT);
        break;
      }
    } else {
      console.error(ERROR_TEXT);
      break;
    }
  }
}

configValidation("C1-C1-R0-A1");
