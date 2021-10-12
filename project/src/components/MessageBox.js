import React from 'react'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import verifyMessage from '../validation'

function MessageBox({ to, from, onAdd }) {

    const [content, setContent] = useState('');
    const [failed, setFailed] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        let status = verifyMessage(content)
        if (status === "") {
            const msg = { content, from }
            onAdd(msg)
            setContent('')
            setFailed('')
        } else {
            setFailed(status)
        }
    }


    return (
        <div>
            <div className="msg-box-errror">
                <form method="post" className="container-msg-box" onSubmit={handleSubmit}>
                    <textarea placeholder="Skriv in ett meddelande" rows="4" cols="30"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}>
                    </textarea>
                    <Button variant="primary" id="message-box-send-btn" type="submit">Send</Button>{' '}
                </form>
            </div>
            <span >{failed}</span>
        </div>
    )
}

export default MessageBox
