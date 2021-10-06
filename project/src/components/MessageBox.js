import React from 'react'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

function MessageBox({from, onAdd}) {

    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const msg = {content, from}
        onAdd(msg)
        console.log("hiii i should be resetted")
        setContent('')
    }

    return (
        <div>
            <form action="#" method="post" className="container-msg-box" onSubmit={handleSubmit}>
                <textarea placeholder="Skriv in ett meddelande" rows="4" cols="30" onChange={(e) => setContent(e.target.value)} ></textarea>
                <Button variant="primary" id="message-box-send-btn" type="submit">Send</Button>{' '}
            </form>
        </div>
    )
}

export default MessageBox
