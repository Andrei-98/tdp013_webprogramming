import React from 'react'
import Link from 'react-router-dom/Link';
import Button from 'react-bootstrap/Button'

function SearchRes({ msg, user, update }) {
    const isFriend = user.friends.includes(msg)
    const sentReq = user.sent_req.includes(msg)
    const receivedReq = user.received_req.includes(msg)
    const noReqs = (!isFriend && !sentReq && !receivedReq && msg !== user.username)


    function add_friend() {
        fetch('http://localhost:9070/find',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "sender": user.username, 
                    "receiver": msg 
                })
            })
            .then((response) => {
                update();
                return response.status;
            })
    }


    function accept_friend() {
        fetch('http://localhost:9070/find',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "sender": msg, 
                    "receiver": user.username 
                })
            })
            .then((response) => {
                update();
                return response.status;
            })
    }


    return (
        <div className="search-res">
            {isFriend &&
                <Link to={`/profile/${msg}`}>
                    <div className="clickable-profile grey-3 round-border">
                        <span className="request">{msg}</span>
                    </div>
                </Link>
            }

            {sentReq &&
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">
                        Already sent friend request to {msg}
                    </span>
                </div>
            }

            {receivedReq && 
                <div className="clickable-profile grey-3 round-border">
                    <span className="request"> 
                    Already received friend request {msg}
                    </span>
                    
                    <Button variant="primary" onClick={accept_friend}>
                        Accept request
                    </Button>{' '}
                </div>
            }

            {noReqs && 
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">{msg}</span>
                    <Button variant="primary" onClick={add_friend}>
                        Add friend
                    </Button>{' '}
                </div>
            }
        </div>
    )
}

export default SearchRes
