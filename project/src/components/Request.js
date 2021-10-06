import React from 'react'

function Request({req}) {
    return (
        <div>
            <p>Friend Requests</p>
            <p>{req}</p>
            <button>Add</button>
        </div>
    )
}

export default Request
