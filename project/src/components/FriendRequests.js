import React from 'react'
import Request from './Request'

function FriendRequests({requests, target, onAdd, update}) {

    
    return (
        <div>
            {requests.map((req) => (
                <Request sender={req} target={target} onAdd={onAdd} update={update}/>)
            )}
        </div>
    )
}

export default FriendRequests
