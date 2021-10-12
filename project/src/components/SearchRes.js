import React from 'react'
import Link from 'react-router-dom/Link';
import Button from 'react-bootstrap/Button'

function SearchRes({ msg, user, update }) {
    function is_friend() {
        if (user.friends.includes(msg)) {
            return true;
        }
        else {
            return false;
        }
    }

    function sent_req() {
        if (user.sent_req.includes(msg)) {
            return true
        }
        else {
            return false;
        }
    }
    function received_req() {
        if (user.received_req.includes(msg)) {
            return true
        }
        else {
            return false;
        }
    }

    function add_friend() {
        fetch('http://localhost:9070/find',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "sender": user.username, "receiver": msg })
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
                body: JSON.stringify({ "sender": msg, "receiver": user.username })
            })
            .then((response) => {
                update();
                return response.status;
            })
    }

    return (
        <div className="search-res">
            {is_friend() ? (
                <Link to={`/profile/${msg}`}>
                    <div className="clickable-profile grey-3 round-border">
                        <span className="request">{msg}</span>
                    </div>
                </Link>
            )
                : (
                    null
                )
            }
            {sent_req() ? (
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">Already sent friend request to {msg}</span>
                </div>
            )
                : (
                    null
                )
            }
            {received_req() ? (
                <div className="clickable-profile grey-3 round-border">
                    <span className="request"> Already received friend request {msg}</span>
                    <Button variant="primary" onClick={accept_friend}>Accept request</Button>{' '}
                </div>
            )
                : (
                    null
                )
            }
            {!is_friend() && !sent_req() && !received_req() && msg !== user.username ? (
                <div className="clickable-profile grey-3 round-border" >
                    <span className="request">{msg}</span>
                    <Button variant="primary" onClick={add_friend}>Add friend</Button>{' '}
                </div>
            )
                : (
                    null
                )
            }
        </div>
    )
}

export default SearchRes
