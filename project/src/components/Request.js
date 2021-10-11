import React from 'react'
import { FcCheckmark } from "react-icons/fc"


function Request({sender, target, onAdd, update}) {

    const handleClick = (e) => {
        e.preventDefault()
        const req = {"sender": sender, "receiver": target}
        onAdd(req)
        update()
    }

    return (
        <div>
            <p>Friend Requests</p>
            <p>{sender}</p>
            <FcCheckmark onClick={handleClick} style={{ cursor: 'pointer'}} />
            {/* <button onClick={handleClick}>Add</button> */}
        </div>
    )
}

export default Request
