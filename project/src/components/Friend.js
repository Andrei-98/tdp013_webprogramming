// eslint-disable-next-line
import { FaTimes } from "react-icons/fa"
import React from 'react'
import Link from 'react-router-dom/Link';

function Friend({ friend }) {
    return (
        <div className="friend-container grey-3">
            <Link to={`/profile/${friend}`}><span>{friend}</span></Link>
            {/* <FaTimes
                style={{ color: 'red', cursor: 'pointer'}}
                //onClick={() => onDelete(friend.name)}
            /> */}
        </div>
    )
}

export default Friend
