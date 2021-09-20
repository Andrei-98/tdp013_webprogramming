fetch("http://localhost:9070/messages")
.then(res => res.json())
.then(data => console.log(data))