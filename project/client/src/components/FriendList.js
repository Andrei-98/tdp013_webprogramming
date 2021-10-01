function FriendList({all_friends}) {
    return (
        <div className="simple-container">
            {all_friends.map((friend) => (
                <p>{friend.name}</p>))}
        </div>
    )
}

export default FriendList