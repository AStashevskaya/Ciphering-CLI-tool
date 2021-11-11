import {
  ARGUMENT_CONFIG,
  ARGUMENT_INPUT,
  ARGUMENT_OUTPUT,
  ERROR_TEXT
} from "./src/constants/index.js";
import { getConfig } from './src/utils/index.js'

function ciphering_cli() {
const args = process.argv
console.log(args)

const config = getConfig(args);
if(config) {
  
    console.log(config);
} else {
    console.error('There is no config')
}

}

ciphering_cli()