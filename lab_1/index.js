let message_arr = [];

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
    console.log(mess);
    if(mess != "")
    {
        let mess_arr = mess.split(";");
        console.log(mess_arr);

        for(let i = 0; i < mess_arr.length; i++)
        {
            mess_arr[i] = mess_arr[i].replace(/message\d+\=/, "");
            display_message(mess_arr[i]);
            save_message(mess_arr[i]);
        }
    }
}


function save_message(text)
{
    message_arr.push(text);
    document.cookie = "message" + message_arr.length + "=" + text;
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

function display_message(text) // Kasper version
{
    const list = document.getElementById("msg_list");
    const new_msg = document.createElement("div");
    const msg_btn = document.createElement("button");
    msg_btn.innerHTML = document.createTextNode("Read").textContent;
    msg_btn.setAttribute("class","msg_btn");
    msg_btn.setAttribute("name", "off");
    msg_btn.addEventListener('click', read_message);
    const content = document.createTextNode(text);

    new_msg.appendChild(content);    
    new_msg.appendChild(msg_btn);

    const el = document.createElement("li");
    el.appendChild(new_msg); 

    list.insertBefore(el, list.childNodes[0]);
}

// listener for message buttons
function read_message() 
{
    if(this.getAttribute("name") == "off")
    {
        this.setAttribute("name","on");
        this.parentElement.style.color = "grey";
    }
    else
    {
        this.setAttribute("name","off");
        this.parentElement.style.color = "black";
    }
}

main();