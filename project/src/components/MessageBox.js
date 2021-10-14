import React from 'react'
import FloatingLabel from 'react-bootstrap/FormLabel'
import Form from 'react-bootstrap/Form'
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
            <div className="msg-box-error">
                
                <Form
                    className="container-msg-box"
                    onSubmit={handleSubmit}
                    method="POST">

                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Write a message">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '120px', width: '320px' }}
                            value={content}
                            onChange={(e) => setContent(
                                e.target.value)}
                        />

                    </FloatingLabel>

                    <Button
                        style={{ 'marginBottom': '.5rem' }}
                        variant="primary"
                        id="message-box-send-btn"
                        type="submit"
                    >
                        Send
                    </Button>{' '}

                </Form>

            </div>

            <span >{failed}</span>

        </div>
    )
}

export default MessageBox
