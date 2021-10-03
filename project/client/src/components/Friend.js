import { FaTimes } from "react-icons/fa"
import React from 'react'

function Friend({ friend, onDelete }) {
    return (
        <div className="friend-container">
            <span>{friend.name}</span>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer'}}
                onClick={() => onDelete(friend.name)}
            />
        </div>
    )
}

export default Friend
