document.getElementById("send").addEventListener("click", function() 
{
    let text = document.getElementById("text_input").value;
    if (text.length == 0 || text.length > 10) 
    {
        error_msg();
        
    }
    else 
    {
        reset_error();
        //display_message2(text);
        display_message(text);
    }

    // listener for message buttons
    document.getElementById("msg_btn").addEventListener("click", function() 
    {
        console.log("hello world");
        console.clear();

    }); 

}); 

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
    msg_btn.innerHTML = document.createTextNode("Check").textContent;
    msg_btn.setAttribute("id","msg_btn");
    const content = document.createTextNode(text);

    new_msg.appendChild(content);    
    new_msg.appendChild(msg_btn);

    const el = document.createElement("li");
    el.appendChild(new_msg); 

    if(list.getElementsByTagName("li").length >= 3)
    {
        list.removeChild(list.lastElementChild);
    }

    list.insertBefore(el, list.childNodes[0]);

}

function display_message2(text) // Andrei version
{
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createTextNode(text);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    

}




/* document.body.onload = addElement;

function addElement () {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
} */

