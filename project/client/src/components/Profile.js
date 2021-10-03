import FriendList from './FriendList.js'
import MessageList from './MessageList'

function Profile({ user, all_msg, all_friends, onDelete }) {


    return (
        <div>
            <h1>{user}</h1>
            <div className="profile-container">
                <FriendList all_friends={all_friends} onDelete={onDelete} />
                <MessageList all_msg={all_msg} />
            </div>
        </div>
    )
}

export default Profile