# Ciphering-CLI-tool
## CLI tool that will encode and decode a text by 3 substitution ciphers

CLI tool should accept 3 options (short alias and full name):

-c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
1.X is a cipher mark:
- C is for Caesar cipher (with shift 1)
- A is for Atbash cipher
- R is for ROT-8 cipher
2.Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
- 1 is for encoding
- 0 is for decoding
-i, --input: a path to input file
-o, --output: a path to output file

#### To Start application write ** node my_ciphering_cli -c _"your conffig(f.e."C1-C1-A-R0") "_ ** in terminal
