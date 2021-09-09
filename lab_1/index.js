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
        save_message(text);
        display_message(text);
    }
};

function main()
{
    document.getElementById("send").addEventListener("click", render_message);
    let mess = document.cookie;
    
    if(mess != "")
    {
        let mess_arr = mess.split(";");
        console.log(mess_arr.length);

        for(let i = 0; i < mess_arr.length; i++)
        {
            mess_arr[i] = mess_arr[i].replace(/message\d+\=/, "");
            display_message(mess_arr[i], i);
        }
    }
}

function save_message(text)
{
    let real_count = document.cookie.length;
    console.log(real_count);

    document.cookie = "message" + real_count + "=" + text + ";expires=Mon, 01 Nov 2021 12:00:00 UTC"; // TODO Is message read/unread.
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

function display_message(text, index) // Kasper version
{
    console.log("index")
    console.log(index);
    const list = document.getElementById("container-2");
    const new_msg = document.createElement("div");

    const checkbox_container = document.createElement("div");
    const msg_checkbox = document.createElement("input");
    msg_checkbox.type = "checkbox";
    msg_checkbox.className = "btn-check";
    msg_checkbox.id = "checkbox_" + index;
    msg_checkbox.name = "off";
    msg_checkbox.addEventListener("click", read_message);

    const checkbox_label = document.createElement("label");
    checkbox_label.className = "btn btn-outline-primary";
    checkbox_label.innerText = "Read";
    checkbox_label.htmlFor = "checkbox_" + index;
    checkbox_container.className = "box_checkbox";
    checkbox_container.appendChild(msg_checkbox);
    checkbox_container.appendChild(checkbox_label);

    const msg_content = document.createElement("p");
    msg_content.setAttribute("class", "box_text");
    msg_content.innerText = text;

    new_msg.setAttribute("class", "msg_box");
    new_msg.appendChild(msg_content);
    new_msg.appendChild(checkbox_container);

         

    list.insertBefore(new_msg, list.childNodes[0]);
}

// listener for message buttons
/* function read_message() 
{
    console.log("LOGGING")
    if(this.getAttribute("name") == "off")
    {
        this.setAttribute("name","on");
        this.previousSibling.style.color = "grey";
    }
    else
    {
        this.setAttribute("name","off");
        this.previousSibling.style.color = "black";
    }
} */

function read_message() 
{
    console.log("LOGGING")
    if(this.getAttribute("name") == "off")
    {
        this.setAttribute("name","on");
        this.parentElement.parentElement.style.color = "grey";
    }
    else
    {
        this.setAttribute("name","off");
        this.parentElement.parentElement.style.color = "white";
    }
}

main();