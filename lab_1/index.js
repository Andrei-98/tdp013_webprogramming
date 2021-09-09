
let mess_arr = 0;

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
        display_message(text, 0, mess_arr);
    }
};

function main()
{
    document.getElementById("send").addEventListener("click", render_message);
    let mess = document.cookie;
    
    if(mess != "")
    {
        let mess_arr = mess.split(";");

        let sorted_arr = [];

        for(let i = 0; i < mess_arr.length; i++)
        {
            mess_arr[i] = mess_arr[i].replace(/message\d+\=/, "");
            sorted_arr.push(JSON.parse(mess_arr[i]));
        }

        sorted_arr.sort((a,b) => parseInt(a.id) > parseInt(b.id));    

        for(let i = 0; i < sorted_arr.length; i++)
        {
            display_message(sorted_arr[i].content, sorted_arr[i].isRead, i);
        }
    }

}

function save_message(text, is_read = 0, id = mess_arr)
{
    let message_obj = {"id" : id, "content" : text.replace(/[\r\n]+$/, ''), "isRead" : is_read};
    document.cookie = "message" + id + "=" + JSON.stringify(message_obj) + ";expires=Mon, 01 Nov 2021 12:00:00 UTC"; // TODO Is message read/unread
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

function display_message(text, is_read = 0, index) // Kasper version
{
    const list = document.getElementById("container-2");
    const new_msg = document.createElement("div");

    const checkbox_container = document.createElement("div");
    const msg_checkbox = document.createElement("input");
    msg_checkbox.type = "checkbox";
    msg_checkbox.className = "btn-check";
    //msg_checkbox.id = "checkbox_" + index;
    //msg_checkbox.name = "off";

    const checkbox_label = document.createElement("label");
    checkbox_label.className = "btn btn-outline-primary";
    checkbox_label.innerText = "Read";
    checkbox_label.htmlFor = mess_arr;  
    checkbox_container.className = "box_checkbox";
    checkbox_container.appendChild(msg_checkbox);
    checkbox_container.appendChild(checkbox_label);

    const msg_content = document.createElement("p");
    msg_content.setAttribute("class", "box_text");
    msg_content.innerText = text;

    if (msg_checkbox.getAttribute("id") == null)
    {
        msg_checkbox.setAttribute("id", mess_arr);
       
    }
    
    msg_checkbox.addEventListener("click", read_message);

    if(is_read == 0)
    {
        msg_checkbox.setAttribute("name", "off");
    }
    else
    {
        msg_checkbox.setAttribute("name", "on");
        msg_checkbox.setAttribute("checked", "true");
        msg_content.style.color = "grey";
    }

    // msg_btn.addEventListener('click', read_message);

    new_msg.setAttribute("class", "msg_box");
    new_msg.appendChild(msg_content);
    new_msg.appendChild(checkbox_container);

    list.insertBefore(new_msg, list.childNodes[0]);
    mess_arr += 1;
}


// listener - function for message buttons
function read_message() 
{
    console.log("LOGGING")
    if(this.getAttribute("name") == "off")
    {
        this.setAttribute("name", "on");
        this.parentElement.previousSibling.style.color = "grey";
        save_message(this.parentElement.previousSibling.textContent, 1, parseInt(this.getAttribute("id")));
    }
    else
    {
        this.setAttribute("name", "off");
        this.parentElement.previousSibling.style.color = "white";
        save_message(this.parentElement.previousSibling.textContent, 0, parseInt(this.getAttribute("id")));
    }
} 

main();