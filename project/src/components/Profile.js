import FriendList from './FriendList.js'
import MessageList from './MessageList'
import MessageBox from './MessageBox'

function Profile({ user, all_msg, all_friends, onDelete }) {


    return (
        <div>
            <h1>{user}</h1>
            <MessageBox from={user}/>
            <div className="profile-container">
                <FriendList all_friends={all_friends} onDelete={onDelete} />
                <MessageList all_msg={all_msg} />
            </div>
        </div>
    )
}

export default Profile