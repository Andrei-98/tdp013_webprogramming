import React from 'react'
import { FcCheckmark } from "react-icons/fc"


function Request({sender, target, onAdd, update}) {

    const handleClick = (e) => {
        e.preventDefault()
        const req = {"sender": sender, "target":target}
        onAdd(req)
        update()
    }

    return (
        <div className="friend-container grey-3 round-border">
            <span>{sender}</span>
            <FcCheckmark onClick={handleClick} style={{ cursor: 'pointer'}} />
            {/* <button onClick={handleClick}>Add</button> */}
        </div>
    )
}

export default Request
