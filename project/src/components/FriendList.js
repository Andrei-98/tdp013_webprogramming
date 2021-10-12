import React from "react"
import Friend from "./Friend"

function FriendList({ friends }) {

    return (
        <div className="friends-list-container round-border grey-2">
            <p>Friends</p>
            {friends.length === 0 && <span>No friends to show :(</span>}    

            {friends.map((friend) => (
                <Friend friend={friend} key={String(friend)} />
            ))
            }

        </div>
    )
}

export default FriendList