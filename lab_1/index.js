// TODO fix button maybe

// Event listener for the send button, reads in all cookies sorts them and 
// displays them on the screen based on when they were posted
function main()
{
    document.getElementById("send").addEventListener("click", render_message);

    let all_cookies = document.cookie;
    if(all_cookies != "")
    {
        all_cookies = all_cookies.split(";");
        let sorted_cookies = [];

        for(let i = 0; i < all_cookies.length; i++)
        {
            all_cookies[i] = all_cookies[i].replace(/message\d+\=/, "");
            sorted_cookies.push(JSON.parse(all_cookies[i]));
        }

        sorted_cookies.sort((a,b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);  
        
        for(let i = 0; i < sorted_cookies.length; i++)
        {
            display_message(sorted_cookies[i].content, sorted_cookies[i].isRead, i + 1);
        }
    }
}
// creates a message if approved and puts in on screen after click event
function render_message()
{
    let text = document.getElementById("text_input").value;
    if (text.length == 0 || text.length > 140) 
    {
        error_msg();
    }
    else 
    {
        reset_error();
        let index = save_message(text);
        display_message(text, 0, index);
    }
}

function error_msg()
{
    let error = document.getElementById("error");
    error.textContent = "Enter between 1 and 140 characters!";
}

function reset_error()
{
    const error = document.getElementById("error");
    error.textContent = "";
}

// Saves the message posted.
// text = text of the message
// is_read = determines if the read button is on or off
// id = id of the message, id is null when the message is just created, 
// if id exists the function will find the specific message related to that id
function save_message(text, is_read = 0, id = null)
{
    let index = 0;

    if (id != null)
    {
        index = id;
    }
    else if (document.cookie == "")
    {
        index = 1;
    }
    else
    {
        index = document.cookie.split(";").length + 1 
    }
    
    let message_obj = {"id" : index, "content" : text.replace(/[\r\n]+$/, ''), "isRead" : is_read};
    document.cookie = "message" + index + "=" + JSON.stringify(message_obj) + ";expires=Mon, 01 Nov 2021 12:00:00 UTC;SameSite=Lax";

    return index;
}

// Creates necessary elements and insert into DOM
function display_message(text, is_read = 0, i)
{
    const main_div = document.getElementById("container-2");
    const new_msg = document.createElement("div");

    // checkbox_container holds checkbox and checkbox_label
    const checkbox_container = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "btn-check";
    checkbox.setAttribute("id", i);
    const checkbox_label = document.createElement("label");
    checkbox_label.className = "btn btn-outline-primary";
    checkbox_label.innerText = "Read";
    checkbox_label.htmlFor = i;  
    checkbox_container.className = "box_checkbox";
    checkbox_container.appendChild(checkbox);
    checkbox_container.appendChild(checkbox_label);
    checkbox.addEventListener("click", read_message);


    const msg_content = document.createElement("p");
    msg_content.setAttribute("class", "box_text");
    msg_content.innerText = text;

    if(is_read == 0)
    {
        checkbox.setAttribute("autocomplete", "off");
        checkbox.checked;
    }
    else
    {
        checkbox.checked = "on";
        checkbox.setAttribute("autocomplete", "on");
        msg_content.style.color = "grey";
    }

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
        save_message(message_p_tag.textContent, 1, parseInt(this.getAttribute("id")));
    }
    else
    {
        this.setAttribute("checked", "false");
        message_p_tag.style.color = "white";
        save_message(message_p_tag.textContent, 0, parseInt(this.getAttribute("id")));
    }
}

main();
