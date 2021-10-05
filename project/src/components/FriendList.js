import Friend from "./Friend"

function FriendList({ all_friends }) {
    return (
        <div className="friends-list-container">
            {console.log(all_friends)}

            {all_friends.map((friend) => (
                <Friend friend={friend} key={String(friend)} />
            ))
            }
        </div>
    )
}

export default FriendList