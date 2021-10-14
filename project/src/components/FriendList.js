import React from "react"
import Friend from "./Friend"

function FriendList({ friends }) {

    return (
        <div className="friends-list-container round-border grey-2">
            <p>Friends</p>
            {friends.length === 0 && <span>No friends to show :(</span>}    

            {friends.map((friend, index) => (
                <Friend friend={friend} key={index} />
            ))
            }

        </div>
    )
}

export default FriendList