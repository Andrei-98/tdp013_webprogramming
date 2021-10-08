import React from 'react'
import Request from './Request'

function FriendRequests({requests, target, onAdd}) {

    
    return (
        <div>
            {requests.map((req) => (
                <Request sender={req} target={target} onAdd={onAdd}/>)
            )}
        </div>
    )
}

export default FriendRequests
