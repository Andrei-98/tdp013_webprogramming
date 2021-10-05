import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState } from 'react'

function Profile({ user }) {

    //const [user2, setUser] = useState(user);
    

    return (
        <div>
            <h1>{user.username}</h1>
            <div className="profile-container">
                <FriendList all_friends={user.friends}  />
                <MessageList all_msg={user.messages} />
            </div>
        </div>
    )
}

export default Profile