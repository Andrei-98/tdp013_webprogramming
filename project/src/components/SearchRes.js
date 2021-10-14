import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

function SearchRes({ receiver, user, update }) {

    // These boolean values determine if the SearchRes component rendered is a 
    // clickable profile if isFriend is true
    // "Request already sent" if sentReq is true
    // Accept Friend button if receivedReq is true
    // Add friend if all the above are false and the user searched
    // is not the logged in profile
    const isFriend = user.friends.includes(receiver)
    const sentReq = user.sent_req.includes(receiver)
    const receivedReq = user.received_req.includes(receiver)
    const noReqs = (!isFriend && !sentReq && !receivedReq && receiver !== user.username)


    function addFriend() {
        fetch('http://localhost:9070/find',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "sender": user.username, 
                    "receiver": receiver 
                })
            })
            .then((response) => {
                update();
                return response.status;
            })
    }


    function acceptFriend() {
        fetch('http://localhost:9070/find',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "sender": receiver, 
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
                <Link to={`/profile/${receiver}`}>
                    <div className="clickable-profile grey-3 round-border">
                        <span className="request">{receiver}</span>
                    </div>
                </Link>
            }

            {sentReq &&
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">
                        Already sent friend request to {receiver}
                    </span>
                </div>
            }

            {receivedReq && 
                <div className="clickable-profile grey-3 round-border">
                    <span className="request"> 
                    Already received friend request {receiver}
                    </span>
                    
                    <Button variant="primary" onClick={acceptFriend}>
                        Accept request
                    </Button>{' '}
                </div>
            }

            {noReqs && 
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">{receiver}</span>
                    <Button variant="primary" onClick={addFriend}>
                        Add friend
                    </Button>{' '}
                </div>
            }
        </div>
    )
}

export default SearchRes
