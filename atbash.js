import alphabet from "./alphabet.js";
import { isUpperCase } from "./src/utils/index.js";

export default function atbash(string) {
//   const firstHalph = alphabet.slice(0, alphabet.length / 2);
//   const secondHalph = alphabet.slice(alphabet.length / 2);
//   console.log("firstHalph", firstHalph);
//   console.log("secondHalph", secondHalph);
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
    const newLetterIdx = Math.abs(alphabet.length - 1 - letterIdx);
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
  console.log('result', result)
}

atbash('Cre Me, fffaz');
