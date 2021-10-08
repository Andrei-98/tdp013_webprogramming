function IsJsonString(str) {
    try {
        str = JSON.parse(str);
        if (typeof str === "object") {
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}


function validate_string(...string) {
    for (let i = 0; i < string.length; i++) {
        console.log(string[i])
        if (typeof string[i] != "string") {
            return false
        }

        // {"content": "this"}
        if (IsJsonString(string[i])) {
            return false
        }

        //${console.log}
        if (!!string[i].match(/\$.*\{.*\}/)) {
            return false;
        }

    }

    return true
}

//    /\/fr\/.+/
//    /\/find\/.+/
//    /\/friends\/.+/
//    /\/messages\/.+/
//    "/chat",
// function validateGETreq(httpPath) {
//     console.log("Requested method: GET")

//     switch(httpPath) {
//         case (httpPath == "/fr" || httpPath.match(/\/fr\/.+/)):
//             200
//             break;
//         case (httpPath == "/find" || httpPath.match(/\/find\/.+/)):
//             200
//             break;
//         case (httpPath == "/friends" || httpPath.match(/\/friends\/.+/)):
//             200
//             break;
//         case (httpPath == "/messages" || httpPath.match(/\/messages\/.+/)):
//             200
//             break;
//         default:
//             404;
//     }
//     // if (httpPath == "/fr" || httpPath.match(/\/fr\/.+/)) {
//     //     return 200;
//     // }
//     // else {
//     //     return 404;
//     // }
// }


// function validatePOSTreq(httpPath) {
//     console.log("Requested method: POST")

//     if (httpPath == "/messages") {
//         return 200;
//     }
//     else {
//         return 404;
//     }
// }


// function validatePUTreq(httpPath) {
//     console.log("Requested method: PUT")

//     if (httpPath.match(/\/messages\/[0-9]+/)) {
//         return 200;
//     }
//     else {
//         return 404;
//     }
// }


// function validateRequest(httpMethod, httpPath) {
//     if (httpMethod == "POST") {
//         return validatePOSTreq(httpPath);
//     }
//     else if (httpMethod == "GET") {
//         return validateGETreq(httpPath);
//     }
//     else if (httpMethod == "PUT") {
//         return validatePUTreq(httpPath);
//     }
//     else {
//         return 405;
//     }
// }


module.exports = {validate_string};