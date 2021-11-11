import { ERROR_TEXT, ARGUMENT_CONFIG } from "../constants/index.js";

const isUpperCase = (letter) => {
  return /[A-Z]/.test(letter);
};

const checkEncoding = (string) => {
  if(string.endsWith('1') && string.length === 2) {
    return true
  } else if (string.endsWith("0") && string.length === 2) {
    return false;
  } else {
    return 
  }
}

const checkCipher = (string) => {
  if (string.startsWith('C')) {
    return 'caesar'
  } else if (string.startsWith('A') && string.length === 1) {
    return 'atbash'
  } else if (string.startsWith('R')) {
    return "ROT-8";
  }
}

const checkLength = (string) => {
    if (string.length === 2 || (string.length === 1 && string === "A")) {
      return true;
    } 
}

const getConfig = (arr) => {
const filteredArgs = arr.filter((el) => el === ARGUMENT_CONFIG);
const indexConfig = arr.indexOf(ARGUMENT_CONFIG);

if (!!arr[indexConfig && indexConfig + 1] && filteredArgs.length === 1) {
  return arr[indexConfig + 1]; 
} 
}

export { isUpperCase, checkEncoding, checkLength, checkCipher, getConfig };
