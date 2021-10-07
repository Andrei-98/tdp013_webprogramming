import React from 'react'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

function MessageBox({ to, from, onAdd }) {

    const [content, setContent] = useState('');
    const [failed, setFailed] = useState('');

    function IsJsonString(str) {
        try {
            str = JSON.parse(str);
            if (typeof str === "object") {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }


    const verifyMessage = (text) => {
        if (text.length == 0 || text.length > 140) {
            setFailed("Enter between 1 and 140 characters!");
            return false;
        } else if (!!text.match(/\$.*\{.*\}/)) {
            //not allowed ${console.log(content)}
            setFailed("Forbidden ${} notation not allowed!");
            return false;
        } else if (IsJsonString(text)) {
            // not allowed : {"content": "this"}
            setFailed("Forbidden syntax. Cannot send JSON object!");
            return false;
        } else {
            return true;
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (verifyMessage(content)) {
            const msg = { content, to, from }
            onAdd(msg)
            setContent('')
            setFailed('')
        }
    }


    return (
        <div>
            <form action="#" method="post" className="container-msg-box" onSubmit={handleSubmit}>
                <textarea placeholder="Skriv in ett meddelande" rows="4" cols="30"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <Button variant="primary" id="message-box-send-btn" type="submit">Send</Button>{' '}
            </form>
            <span>{failed}</span>
        </div>
    )
}

export default MessageBox
