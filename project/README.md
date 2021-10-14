Step 1:
    run the following command in the terminal:
        npm install

Step 2:
    Try to run the following command to start the server:
        npm run server
    
    If you dont get any error messages and the terminal says "listening on port 9070" then you can move on to step 3.

    If you recieve an error message similiar to "ReferenceError: TextEncoder is not defined" then do the following:
        1. go to: /project/node_modules/mongodb-connection-string-url/node_modules/whatwg-url/dist/encoding.js
        2. in this file erase everything and replace with the following:
            "use strict";
            const util = require("util");
            const utf8Encoder = new util.TextEncoder();
            const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true });

            function utf8Encode(string) {
            return utf8Encoder.encode(string);
            }

            function utf8DecodeWithoutBOM(bytes) {
            return utf8Decoder.decode(bytes);
            }

            module.exports = {
            utf8Encode,
            utf8DecodeWithoutBOM
            };

Step 3:
    Open a new terminal window inside and start the react application with the following command:
        npm start

If you followed Step 1-3 the server should be running aswell as the application in default browser.

To run tests enter following command in terminal:
    npm test
Or with coverage:
    npm run coverage