import Friend from "./Friend"

function FriendList({ friends }) {

    return (
        <div className="friends-list-container">

            {friends.map((friend) => (
                <Friend friend={friend} key={String(friend)} />
            ))
            }
        </div>
    )
}

export default FriendList