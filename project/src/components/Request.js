import React from 'react'
import { FcCheckmark } from "react-icons/fc"


function Request({ sender, target, onAdd, update }) {

    const handleClick = (e) => {
        e.preventDefault()
        const req = { "sender": sender, "receiver": target }
        onAdd(req)
        update()
    }

    return (
        <div className="friend-container grey-3 round-border">

            <span>{sender}</span>

            <FcCheckmark
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
}

export default Request
