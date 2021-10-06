import React from 'react'
import Request from './Request'

function FriendRequests({requests}) {
    console.log({requests})
    return (
        <div>
            {requests.map((req) => (
                <Request req={req}/>)
            )}
        </div>
    )
}

export default FriendRequests
