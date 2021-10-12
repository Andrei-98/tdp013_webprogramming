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
    // if (string == null) {
    //     return false;
    // }
    // if (string.length == 0) {
    //     return false;
    // }
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

    if (httpPath.match(/\/messages\/.+/))
        isOk = 200;
    else if (httpPath.match(/\/find\/.*/))
        isOk = 200;
    else if (httpPath.match(/\/friends\/.+/))
        isOk = 200;
    else if (httpPath.match(/\/profile\/.+/))
        isOk = 200;

    return isOk;

}


function validatePOSTreq(httpPath) {
    console.log("Requested method: POST")

    let isOk = 404;
    
    if (httpPath === "/register")
        isOk = 200;
    else if (httpPath === "/login")
        isOk = 200;
    else if (httpPath === "/find")
        isOk = 200;
    else if (httpPath.match(/\/profile\/.+/))
        isOk = 200;
    else if (httpPath === "/update")
        isOk = 200;

    return isOk;
}


function validatePUTreq(httpPath) {
    console.log("Requested method: PUT")

    let isOk = 404;
    
    if (httpPath === "/find")
        isOk = 200;   

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
    else if (httpMethod == "OPTIONS") {
        return 200;
    }
    else {
        return 405;
    }
}


module.exports = {validate_string, validateRequest, validateGETreq, validatePOSTreq, validatePUTreq};