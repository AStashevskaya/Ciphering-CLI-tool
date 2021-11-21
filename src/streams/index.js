import MyTransform from "../../transform.js";
import { checkEncoding } from "../utils/index.js";

const createStreamCollection = (config) => {
  const collectionOfStreams = [];

  for (let code of config) {
    const isEncoding = checkEncoding(code);
    const customStream = new MyTransform(code, isEncoding);
    collectionOfStreams.push(customStream);
  }

  return collectionOfStreams;
};

export { createStreamCollection };
