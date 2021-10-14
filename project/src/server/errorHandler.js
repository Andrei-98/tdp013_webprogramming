function password_confirmation(p1, p2) {
    return String(p1) === String(p2);
}


function validate_message(msg) {
    return msg.length > 0 && msg.length < 141;
} 


/* check if request body contains JSON-objects */
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


/* validation for content inside request that is being used in mongo db */
function validate_string(...string) { 
    for (let i = 0; i < string.length; i++) {
        if (typeof string[i] != "string") {
            return false
        }
        
        // search for content such as: {"content": "this"}
        if (IsJsonString(string[i])) {
            return false
        }
 
        // search for content such as: $in{console.log}
        if (!!string[i].match(/\$.*\{.*\}/)) {
            return false;
        }
    }

    return true
}


function validateGETreq(httpPath) {
    let isOk = 404;

    if (httpPath.match(/\/find\/.*/))
        isOk = 200;
    else if (httpPath.match(/\/profile\/.+/))
        isOk = 200;

    return isOk;

}


function validatePOSTreq(httpPath) {
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
    else if (httpPath === "/checkup")
        isOk = 200;

    return isOk;
}


function validatePUTreq(httpPath) {
    let isOk = 404;
    
    if (httpPath === "/find")
        isOk = 200;   

    return isOk;
}


function validateRequest(httpMethod, httpPath) {
    if (httpMethod === "POST") {
        return validatePOSTreq(httpPath);
    }
    else if (httpMethod === "GET") {
        return validateGETreq(httpPath);
    }
    else if (httpMethod === "PUT") {
        return validatePUTreq(httpPath);
    }
    else if (httpMethod === "OPTIONS") {
        return 200;
    }
    else {
        return 405;
    }
}


module.exports = {validate_string, validateRequest, validateGETreq, 
    validatePOSTreq, validatePUTreq, password_confirmation, validate_message};