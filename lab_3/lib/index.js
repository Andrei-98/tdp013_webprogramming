// Eventlisteners
//window.addEventListener("beforeunload", save_messages);
window.addEventListener("load", display_saved);
document.getElementById("send").addEventListener("click", create_new_message);

// Retrieve cookie information and converting each message to js-objects, sort them by index and display them.
async function display_saved() // kasper
{
    let all_messages = await retrieve_messages();

    for (let i = 0; i < all_messages.length; i++)
    {
        display_message(all_messages[i].id, all_messages[i].content, all_messages[i].isRead);
    }
}


function send_message(id, content, isRead) // Andrei
{
  fetch('http://localhost:9070/messages', 
    {
    method: 'POST', 
    headers: {'Content-Type' : 'application/json' },
    body : JSON.stringify({"id" : id, "content" : content, "isRead" : isRead})
    })
  .then((response) => {
    return response.json(); // Skickas till nästa ".then"
  })    
  .then((rsp) => {
    console.log(rsp);
  })
}


export async function retrieve_messages() // kasper
{
   return fetch('http://localhost:9070/messages', 
    {
    method: 'GET', 
    headers: {'Content-Type' : 'application/json' }
    })
  .then((response) => {
    return response.json(); // Skickas till nästa ".then"
  })    
  .then((rsp) => {
    return rsp
  })
}


// Creates a message if approved and puts in on screen after click event
function create_new_message() // andrei
{
    const text = document.getElementById("text_input").value;
    if (text.length == 0 || text.length > 140) 
    {
        error_msg();
    }
    else 
    {
        const main_div = document.getElementById("container-2");
        const id = main_div.childNodes.length;
        error_msg("");
        display_message(id,text);
        send_message(id, text, false);
    }
}


function error_msg(text = "Enter between 1 and 140 characters!") // andrei
{
    const error = document.getElementById("error");
    error.textContent = text;
}


// Creates necessary elements and insert into DOM
function display_message(id, text, is_read = false) // Kasper
{
    const main_div = document.getElementById("container-2");

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
function read_message() //Andrei
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

    fetch('http://localhost:9070/messages/' + this.id, 
    {
        method: 'PUT'
    })
  .then((response) => {
    return console.log(response); // Skickas till nästa ".then"
  })    
  .then((rsp) => {
    console.log(rsp);
  })
}


exports.module = {retrieve_messages};