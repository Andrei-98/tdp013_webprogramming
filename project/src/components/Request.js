import React from 'react'
import { FcCheckmark } from "react-icons/fc"


function Request({sender, target, onAdd}) {

    const handleClick = (e) => {
        e.preventDefault()
        const req = {"sender": sender, "target":target}
        onAdd(req)
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
