import React from 'react'

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
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Request
