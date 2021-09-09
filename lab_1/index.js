
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

        let sorted_arr = [];

        for(let i = 0; i < mess_arr.length; i++)
        {
            mess_arr[i] = mess_arr[i].replace(/message\d+\=/, "");
            sorted_arr.push(JSON.parse(mess_arr[i]));
        }

        sorted_arr.sort((a,b) => parseInt(a.id) > parseInt(b.id));    

        for(let i = 0; i < sorted_arr.length; i++)
        {
            display_message(sorted_arr[i].content, sorted_arr[i].isRead);
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

function display_message(text, is_read = 0) // Kasper version
{
    const list = document.getElementById("container-2");
    const new_msg = document.createElement("div");
    const msg_btn = document.createElement("button");

    msg_btn.innerHTML = document.createTextNode("Read").textContent;
    msg_btn.setAttribute("class","box_checkbox");
    const msg_content = document.createElement("p");
    msg_content.setAttribute("class", "box_text");
    msg_content.innerText = text;
    if (msg_btn.getAttribute("id") == null)
    {
        msg_btn.setAttribute("id", mess_arr);
    }
    
    if(is_read == 0)
    {
        msg_btn.setAttribute("name", "off");
    }
    else
    {
        msg_btn.setAttribute("name", "on");
        msg_content.style.color = "grey";
    }

    msg_btn.addEventListener('click', read_message);

    new_msg.setAttribute("class", "msg_box");
    new_msg.appendChild(msg_content);
    new_msg.appendChild(msg_btn);


    list.insertBefore(new_msg, list.childNodes[0]);
    mess_arr += 1;
}


// listener - function for message buttons
function read_message() 
{
    if(this.getAttribute("name") == "off")
    {
        this.setAttribute("name", "on");
        this.previousSibling.style.color = "grey";
        save_message(this.previousSibling.textContent, 1, parseInt(this.getAttribute("id")));
    }
    else
    {
        this.setAttribute("name", "off");
        this.previousSibling.style.color = "black";
        save_message(this.previousSibling.textContent, 0, parseInt(this.getAttribute("id")));
    }
}

main();