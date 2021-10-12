import React from "react"
import Friend from "./Friend"

function FriendList({ friends }) {

    return (
        <div className="friends-list-container grey-2 round-border">
            {friends.length === 0 && <span>No friends to show :(</span>}    

            {friends.map((friend) => (
                <Friend friend={friend} key={String(friend)} />
            ))
            }

        </div>
    )
}

export default FriendList