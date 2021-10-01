import { FaTimes } from "react-icons/fa"
import React from 'react'

function Friend({ friend, onDelete }) {
    return (
        <div>
            <p>{friend.name}</p>
            <FaTimes
                style={{ color: 'red', cursor: 'pointer'}}
                onClick={() => onDelete(friend.name)}
            />
        </div>
    )
}

export default Friend
