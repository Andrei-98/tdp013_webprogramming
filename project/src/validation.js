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

const verifyMessage = (text) => {
    if (text.length === 0 || text.length > 140) {
        return "Enter between 1 and 140 characters!"
    } else if (!!text.match(/\$.*\{.*\}/)) {
        //not allowed ${console.log(content)}
        return "Forbidden ${} notation not allowed!"
    } else if (IsJsonString(text)) {
        // not allowed : {"content": "this"}
        return "Forbidden syntax. Cannot send JSON object!";
    } else {
        return "";
    }
}

export default verifyMessage