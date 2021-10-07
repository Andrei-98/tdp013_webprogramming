import React from 'react'
import Link from 'react-router-dom/Link';

function SearchRes({ msg, user, update }) {

    // const [status, setStatus] = useState(null);

    // function check_status() {
    //     if (is_friend()) {
    //         return "Friends";
    //     }
    //     else if (sent_req()) {
    //         return "Sent request"
    //     }
    //     else if (received_req()) {
    //         return "Received request"
    //     }
    //     else {
    //         return "Add friend";
    //     }
    // }

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
        <div>
            {is_friend() ? (
                <div className="clickable-profile">
                    <Link to={`/profile/${msg}`}>
                        {/* <button className="friend_button">{check_status()}</button> */}
                        {/* <p>Sent request: {sent_req()}</p>
                    <p>Received request: {received_req()}</p> */}
                        <p>{msg}</p>
                    </Link>
                </div>

            )
                : (
                    null
                )
            }
            {sent_req() ? (
                <div className="clickable-profile" >
                    <p> Already sent friend request</p>
                    <p>{msg}</p>
                </div>
            )
                : (
                    null
                )
            }
            {received_req() ? (
                <div className="clickable-profile" >
                    <p> Already received friend request</p>
                    <button onClick={accept_friend}>Accept request</button>
                    <p>{msg}</p>
                </div>
            )
                : (
                    null
                )
            }
            {!is_friend() && !sent_req() && !received_req() && msg !== user.username ? (
                <div className="clickable-profile" >
                    <button className="Add-btn" onClick={add_friend}>Add friend</button>
                    <p>{msg}</p>
                </div>
            )
                : (
                    null
                )
            }


            {/* <div className="clickable-profile">
                <Link to={`/profile/${msg}`}>
                    {/* <button className="friend_button">{check_status()}</button> 
                    {/* <p>Sent request: {sent_req()}</p>
                        <p>Received request: {received_req()}</p> 
                    <p>{msg}</p>
                </Link>
            </div> */}

        </div>
    )
}

export default SearchRes
