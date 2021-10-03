import Friend from "./Friend"

function FriendList({ all_friends, onDelete }) {
    return (
        <div className="friends-list-container">
            {all_friends.map((friend) => (
                <Friend friend={friend} onDelete={onDelete}/>
            ))
            }
        </div>
    )
}

export default FriendList