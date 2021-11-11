import alphabet from "./alphabet.js";
import { isUpperCase } from "./src/utils/index.js";

export default function rot(string, encoding = true) {
  let result = "";
  const nonShipheredArr = string.split("");

  for (let letter of nonShipheredArr) {
    console.log("letter", letter);
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
          ? 8 - (alphabet.length - 1 - letterIdx)
          : letterIdx + 8;
    } else {
      newLetterIdx = letterIdx - 8 <= 0 ? alphabet.length - (8 - letterIdx) : letterIdx - 8;
    }

    const newLetter = isUpperCaseLetter
      ? alphabet[newLetterIdx].toUpperCase()
      : alphabet[newLetterIdx].toLowerCase();

    result += newLetter;

    console.log("newLetter", newLetter);
  }
  console.log("result", result);
}

rot("Hell0", false);
