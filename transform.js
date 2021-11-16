import { Transform } from "stream";
import alphabet from "./alphabet.js";
import { isUpperCase } from "./src/utils/index.js";
import { ERROR_TEXT, ATBASH, CAESAR, ROT } from "./src/constants/index.js";
import { checkCipher } from "./src/utils/index.js";

class MyTransform extends Transform {
  constructor(code, encoding) {
    super();
    this.code = code;
    this.encoding = encoding;
  }

  _transform(chunk, encoding, callback) {
    const trancformChunk = this.validate(chunk.toString());
    console.log("trancformChunk", trancformChunk);
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
        console.log(ERROR_TEXT);
        break;
    }
  }

  caesar(string, encoding) {
    console.log("caesar", encoding);
    let result = "";
    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = alphabet.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = alphabet.indexOf(letter.toUpperCase());
      let newLetterIdx;

      if (encoding) {
        newLetterIdx = letterIdx + 1 === alphabet.length ? 0 : letterIdx + 1;
      } else {
        newLetterIdx = letterIdx - 1 < 0 ? alphabet.length - 1 : letterIdx - 1;
      }

      const newLetter = isUpperCaseLetter
        ? alphabet[newLetterIdx].toUpperCase()
        : alphabet[newLetterIdx].toLowerCase();

      result += newLetter;
    }
    return result;
  }

  atbash(string) {
    let result = "";
    console.log("atbash");

    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = alphabet.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = alphabet.indexOf(letter.toUpperCase());
      const newLetterIdx = Math.abs(alphabet.length - 1 - letterIdx);

      const newLetter = isUpperCaseLetter
        ? alphabet[newLetterIdx].toUpperCase()
        : alphabet[newLetterIdx].toLowerCase();

      result += newLetter;
    }
    return result;
  }

  rot(string, encoding = true) {
    let result = "";
    console.log("rot", encoding);
    const nonShipheredArr = string.split("");

    for (let letter of nonShipheredArr) {
      const isUpperCaseLetter = isUpperCase(letter);
      const isLetter = alphabet.includes(letter.toUpperCase());

      if (!isLetter) {
        result += letter;
        continue;
      }

      const letterIdx = alphabet.indexOf(letter.toUpperCase());
      let newLetterIdx;

      if (encoding) {
        newLetterIdx =
          letterIdx + 8 >= alphabet.length
            ? 8 - (alphabet.length - letterIdx)
            : letterIdx + 8;
      } else {
        newLetterIdx =
          letterIdx - 8 < 0 ? alphabet.length - (8 - letterIdx) : letterIdx - 8;
      }

      const newLetter = isUpperCaseLetter
        ? alphabet[newLetterIdx].toUpperCase()
        : alphabet[newLetterIdx].toLowerCase();

      result += newLetter;
    }

    return result;
  }
}

export default MyTransform;
