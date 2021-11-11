import alphabet from "./alphabet.js";
import { isUpperCase } from "./src/utils/index.js";

export default function caesar(string, encoding = true) {
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
      newLetterIdx = letterIdx + 1 >= alphabet.length - 1 ? 0 : letterIdx + 1;
    } else {
        newLetterIdx =
          letterIdx - 1 === 0 ? alphabet.length - 1 : letterIdx - 1;
    }

    // const letterIdx = alphabet.indexOf(letter.toUpperCase());
    // const newLetterIdx = Math.abs(alphabet.length - 1 - letterIdx);
    // const newLetterIdx =
    //   letterIdx >= alphabet.length / 2
    //     ? letterIdx - alphabet.length / 2
    //     : letterIdx + alphabet.length / 2;

    const newLetter = isUpperCaseLetter
      ? alphabet[newLetterIdx].toUpperCase()
      : alphabet[newLetterIdx].toLowerCase();

    result += newLetter;

    console.log("newLetter", newLetter);
  }
  console.log("result", result);
}

caesar('Hell0', false)