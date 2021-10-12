// eslint-disable-next-line

import React from 'react'
import Link from 'react-router-dom/Link';

function Friend({ friend }) {
    return (
        <Link to={`/profile/${friend}`} className="links">
            <div className="friend-container grey-3 round-border">
                
                <span>{friend}</span>
            </div>
        </Link>
    )
}

export default Friend
