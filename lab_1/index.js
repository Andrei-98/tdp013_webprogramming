// TODO fix button maybe
window.addEventListener("beforeunload", save_messages);
window.addEventListener("load", display_saved);
document.getElementById("send").addEventListener("click", create_new_message);

// Global constant used for checking if client clears cookies
const COOKIE_LENGTH = document.cookie.length;

// Retrieve cookie information and converting each message to js-objects, sort them by index and display them.
function display_saved()
{
      let all_cookies = document.cookie;
      if(all_cookies != "")
      {
        all_cookies = all_cookies.replace(/messages\=/, "");
        let all_cookies_arr = all_cookies.split("},");
        for (let i = 0; i < all_cookies_arr.length - 1; i++)
        {
            all_cookies_arr[i] = JSON.parse(all_cookies_arr[i] + "}");
        }
        all_cookies_arr[all_cookies_arr.length - 1] = JSON.parse(all_cookies_arr[all_cookies_arr.length - 1]); 

        all_cookies_arr.sort((a,b) => parseInt(a.id) < parseInt(b.id) ? 1 : -1);  
        for(let i = 0; i < all_cookies_arr.length; i++)
        {
            display_message(all_cookies_arr[i].content, all_cookies_arr[i].isRead);
        }
      }
}
   
// Creates a message if approved and puts in on screen after click event
function create_new_message()
{
    const text = document.getElementById("text_input").value;
    if (text.length == 0 || text.length > 140) 
    {
        error_msg();
    }
    else 
    {
        reset_error();
        display_message(text);
    }
}

function error_msg()
{
    const error = document.getElementById("error");
    error.textContent = "Enter between 1 and 140 characters!";
}

function reset_error()
{
    const error = document.getElementById("error");
    error.textContent = "";
}

// Saves the message posted.
// text = text of the message
// checked = determines if the read button is on or off
// id = order of the message, when it is created chronologically 
function save_messages()
{
    // retrieve all messages
    const all_messages = document.getElementsByClassName("msg_box");
    // If user has cleared cookie, dont save these messages
    if (document.cookie.length >= COOKIE_LENGTH && all_messages.length > 0)
    {

        let messages_arr = [];
        let message = {};

        for (let i = 0; i < all_messages.length; i++)
        {
            const text = all_messages[i].childNodes[0].textContent;
            const checked = all_messages[i].childNodes[1].childNodes[0].checked;
            message = {"id" : i, "content" : text.replace(/[\r\n]+$/, ''), "isRead" : checked};
            messages_arr.push(JSON.stringify(message));
        }
        
        document.cookie = "messages=" + messages_arr + ";expires=Mon, 01 Nov 2021 12:00:00 UTC;SameSite=Lax";
    }
}

// Creates necessary elements and insert into DOM
function display_message(text, is_read = false)
{
    const main_div = document.getElementById("container-2");
    const id = main_div.childNodes.length;

    // checkbox_container holds checkbox and checkbox_label
    const checkbox_container = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "btn-check";
    checkbox.setAttribute("id", id);
    const checkbox_label = document.createElement("label");
    checkbox_label.className = "btn btn-outline-primary";
    checkbox_label.innerText = "Read";
    checkbox_label.htmlFor = id;  
    checkbox_container.className = "box_checkbox";

    checkbox_container.appendChild(checkbox);
    checkbox_container.appendChild(checkbox_label);
    checkbox.addEventListener("click", read_message);

    const msg_content = document.createElement("p");
    msg_content.setAttribute("class", "box_text");
    msg_content.innerText = text;

    if(is_read)
    {
        checkbox.checked = "true";
        msg_content.style.color = "grey";
    }

    const new_msg = document.createElement("div");
    new_msg.setAttribute("class", "msg_box");
    new_msg.appendChild(msg_content);
    new_msg.appendChild(checkbox_container);

    main_div.insertBefore(new_msg, main_div.childNodes[0]);
}


// Callback function for when listener click read-button
function read_message() 
{
    let message_p_tag = this.parentElement.previousSibling
    if(this.checked)
    {
        this.setAttribute("checked", "true");
        message_p_tag.style.color = "grey";
    }
    else
    {
        this.setAttribute("checked", "false");
        message_p_tag.style.color = "white";
    }
}
