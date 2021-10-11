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
    if (string == null) {
        return false;
    }
    if (string.length == 0) {
        return false;
    }
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


function validateGETreq(httpPath) {
    console.log("Requested method: GET")

    let isOk = 404;
    switch(httpPath) {
        case (httpPath.match(/\/messages\/.+/)):
            isOk = 200;
            break;
        case (httpPath.match(/\/find\/.*/)):
            isOk = 200;
            break;
        case (httpPath.match(/\/friends\/.+/)):
            isOk = 200;
            break;
        case (httpPath.match(/\/profile\/.+/)):
            isOk = 200;
            break;
        default:
            isOk = 404;
    }

    return isOk;
}


function validatePOSTreq(httpPath) {
    console.log("Requested method: POST")

    let isOk = 404;
    switch(httpPath) {
        case (httpPath === "/register"):
            isOk = 200;
            break;
        case (httpPath === "/login"):
            isOk = 200;
            break;
        case (httpPath === "/find"):
            isOk = 200;
            break;
        case (httpPath.match(/\/profile\/.+/)):
            isOk = 200;
            break;
        case (httpPath === "/update"):
            isOk = 200;
            break;
        default:
            isOk = 404;
    }

    return isOk;
}


function validatePUTreq(httpPath) {
    console.log("Requested method: PUT")

    let isOk = 404;
    switch(httpPath) {
        case (httpPath === "/find"):
            isOk = 200;
            break;
        default:
            isOk = 404;
    }

    return isOk;
}


function validateRequest(httpMethod, httpPath) {
    if (httpMethod == "POST") {
        return validatePOSTreq(httpPath);
    }
    else if (httpMethod == "GET") {
        return validateGETreq(httpPath);
    }
    else if (httpMethod == "PUT") {
        return validatePUTreq(httpPath);
    }
    else {
        return 405;
    }
}


module.exports = {validate_string, validateRequest, validateGETreq, validatePOSTreq, validatePUTreq};