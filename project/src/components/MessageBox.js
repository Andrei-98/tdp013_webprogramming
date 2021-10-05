import React from 'react'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

function MessageBox({from}) {

    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        const msg = {content, from}
        console.log("submitting")
        console.log(msg)
        fetch('http://localhost:9070/profile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(msg)
        })
    }

    return (
        <div>
            <form action="#" method="post" className="container-msg-box" onSubmit={handleSubmit}>
                <textarea placeholder="Skriv in ett meddelande" rows="4" cols="30" onChange={(e) => setContent(e.target.value)} ></textarea>
                <Button variant="primary" id="message-box-send-btn" onClick={handleSubmit}>Send</Button>{' '}
            </form>
        </div>
    )
}

export default MessageBox
