document.getElementById("send").addEventListener("click", function() {
    let text = document.getElementById("text_input").value;
    // let text_node = document.getElementById("text_input");
    console.log(text.length);

    if (text.length == 0 || text.length > 10) {
        error_msg();
        
    }
    else {
        reset_error();
        //display_message2(text);
        display_message(text);
    }

  }); 

function error_msg()
{
    console.log("IN ERROR");
    let error = document.getElementById("error");
    error.textContent = "Too many characters!";
    error.style.color = "red";
}

function reset_error()
{
    let error = document.getElementById("error");
    error.textContent = "";
}

function display_message(text) 
{
    //const new_message = document.createElement("div");
    const content = document.createElement("p");
    //new_message.appendChild(content);
    
    content.innerHTML = text;
    
    let list = document.getElementById("msg_list");
    let el = document.createElement("li");
    el.innerHTML = content.textContent;
    list.appendChild(el);
}

function display_message2(text) 
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

