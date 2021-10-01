import FriendList from './FriendList.js'
import MessageList from './MessageList'

function Profile({user, all_msg, all_friends}) {


    return (
        <div>
            <h1>{user}</h1>
            <FriendList all_friends={all_friends}/>
            <MessageList all_msg={ all_msg }/>
        </div>
    )
}

export default Profile