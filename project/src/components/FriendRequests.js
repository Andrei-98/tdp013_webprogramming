import React from 'react'
import Request from './Request'

function FriendRequests({ requests, target, onAdd, update }) {


    return (
        <div className="friends-list-container round-border grey-2">
            <p>Friend Requests</p>
            {requests.length === 0 && <span>No friend requests.</span>}
            {requests.map((req, index) => (
                <Request
                    sender={req}
                    target={target}
                    onAdd={onAdd}
                    update={update}
                    key={index}
                />)
            )}
        </div>
    )
}

export default FriendRequests
