import React from 'react'
import Link from 'react-router-dom/Link';

function SearchRes({ msg, user }) {

    // const [status, setStatus] = useState(null);

    function check_status()
    {
        if (is_friend()) {
            return "Friends";
        }
        else if (sent_req()) {
            return "Sent request"
        }
        else if (received_req()) {
            return "Received request"
        }
        else {
            return "Add friend";
        }
    }

    function is_friend() {
        if (user.friends.includes(msg)) {
            return true;
        }
        else 
        {
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


    return (
        <div>
            <div className="clickable-profile">
                <Link to={`/profile/${msg}`} params={{ username: msg }}>
                    {/* <button className="friend_button">{check_status()}</button> */}
                    {/* <p>Sent request: {sent_req()}</p>
                        <p>Received request: {received_req()}</p> */}
                    <p>{msg}</p>
                </Link>
            </div>

        </div>
    )
}

export default SearchRes
