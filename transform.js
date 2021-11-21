import { Transform } from "stream";
import { isUpperCase } from "./src/utils/index.js";
import {
  ERROR_TEXT,
  ATBASH,
  CAESAR,
  ROT,
  ALPHABET,
} from "./src/constants/index.js";
import { checkCipher } from "./src/utils/index.js";

class MyTransform extends Transform {
  constructor(code, encoding) {
    super();
    this.code = code;
    this.encoding = encoding;
  }

  _transform(chunk, encoding, callback) {
    const trancformChunk = this.validate(chunk.toString());

    this.push(trancformChunk);
    callback();
  }

  validate(string) {
    this.chipher = checkCipher(this.code);

    switch (this.chipher) {
      case CAESAR:
        return this.caesar(string, this.encoding);
      case ATBASH:
        return this.atbash(string);
      case ROT:
        return this.rot(string, this.encoding);
      default:
        process.stderr.write("Ooops! Something goes wrong..");
        process.exit(1);
        break;
    }
  }

  caesar(string, encoding) {
    let result = "";
    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = ALPHABET.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = ALPHABET.indexOf(letter.toUpperCase());
      let newLetterIdx;

      if (encoding) {
        newLetterIdx = letterIdx + 1 === ALPHABET.length ? 0 : letterIdx + 1;
      } else {
        newLetterIdx = letterIdx - 1 < 0 ? ALPHABET.length - 1 : letterIdx - 1;
      }

      const newLetter = isUpperCaseLetter
        ? ALPHABET[newLetterIdx].toUpperCase()
        : ALPHABET[newLetterIdx].toLowerCase();

      result += newLetter;
    }
    return result;
  }

  atbash(string) {
    let result = "";
    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = ALPHABET.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = ALPHABET.indexOf(letter.toUpperCase());
      const newLetterIdx = Math.abs(ALPHABET.length - 1 - letterIdx);

      const newLetter = isUpperCaseLetter
        ? ALPHABET[newLetterIdx].toUpperCase()
        : ALPHABET[newLetterIdx].toLowerCase();

      result += newLetter;
    }
    return result;
  }

  rot(string, encoding = true) {
    let result = "";
    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = ALPHABET.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = ALPHABET.indexOf(letter.toUpperCase());
      let newLetterIdx;

      if (encoding) {
        newLetterIdx =
          letterIdx + 8 >= ALPHABET.length
            ? 8 - (ALPHABET.length - letterIdx)
            : letterIdx + 8;
      } else {
        newLetterIdx =
          letterIdx - 8 < 0 ? ALPHABET.length - (8 - letterIdx) : letterIdx - 8;
      }

      const newLetter = isUpperCaseLetter
        ? ALPHABET[newLetterIdx].toUpperCase()
        : ALPHABET[newLetterIdx].toLowerCase();

      result += newLetter;
    }

    return result;
  }
}

export default MyTransform;
