/*
 * Function that runs multiple tests on the information the user typed in
 * id = id of the message, should be Integer
 * content = the text, should be a string
 * isRead = should be boolean
 */
function validate_message(id, content, isRead)
{
  let is_ok = false;
  if (typeof id == "number")
  {
    if (typeof isRead == "boolean")
    {
        if (typeof content == "object")
        {
          return is_ok;
        }

        // in the string content try to find mongodb commands like: ${variable}
        // no match = null => false
        // one or more matches = true

        if (!!content.match(/\$.*\{.*\}/))
        {
          is_ok = false;
        }
        else 
        {
            is_ok = true;
        }
    }
  }

  return is_ok;
}


function validateGETreq(httpPath)
{
    console.log("Requested method: GET")

    if (httpPath == "/messages" || httpPath.match(/\/messages\/\d+/))
    {
        return 200;
    }
    else
    {
        return 404;
    }
}


function validatePOSTreq(httpPath)
{
    console.log("Requested method: POST")

    if (httpPath == "/messages")
    {
        return 200;
    }
    else
    {
        return 404;
    }
}


function validatePUTreq(httpPath)
{
    console.log("Requested method: PUT")

    if (httpPath.match(/\/messages\/[0-9]+/))
    {
        return 200;
    }
    else
    {
        return 404;
    }
}


function validateRequest(httpMethod,httpPath)
{
    if (httpMethod == "POST")
    {   
        return validatePOSTreq(httpPath);    
    }
    else if (httpMethod == "GET")
    {
        return validateGETreq(httpPath);
    }
    else if (httpMethod == "PUT")
    {
        return validatePUTreq(httpPath);
    }
    else if (httpMethod == "OPTIONS")
    {
        return 200
    }
    else
    {
        return 405;
    }
}


module.exports = {validate_message, validateRequest};