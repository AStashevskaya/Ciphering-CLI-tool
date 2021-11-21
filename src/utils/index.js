import { ARGUMENTS_ERROR } from '../constants/index.js'

const isUpperCase = (letter) => {
  return /[A-Z]/.test(letter);
};

const checkEncoding = (string) => {
  if (string.endsWith("1") && string.length === 2) {
    return true;
  } else if (string.endsWith("0") && string.length === 2) {
    return false;
  } else {
    return;
  }
};

const checkCipher = (string) => {
  if (string.startsWith("C")) {
    return "caesar";
  } else if (string.startsWith("A") && string.length === 1) {
    return "atbash";
  } else if (string.startsWith("R")) {
    return "ROT-8";
  }
};

const checkLength = (string) => {
  if (string.length === 2 || (string.length === 1 && string === "A")) {
    return true;
  }
};

const getValue = (args, flag1, flag2) => {
  const filteredArgs = args.filter((el) => el === flag1 || el === flag2);
  const flagIdx = filteredArgs[0] ? args.indexOf(filteredArgs[0]) : null;

  if (!!args[flagIdx && flagIdx + 1] && filteredArgs.length === 1) {
    return args[flagIdx + 1];
  }

  if (filteredArgs.length > 1) {
    process.stderr.write(ARGUMENTS_ERROR);
    process.exit(1);
  }
};

export { isUpperCase, checkEncoding, checkLength, checkCipher, getValue };
