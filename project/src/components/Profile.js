import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState } from 'react'
import MessageBox from './MessageBox'

function Profile({ user }) {

    //const [user2, setUser] = useState(user);
    

    return (
        <div>
            <h1>{user.username}</h1>
            {/* <h1>{user}</h1> */}
            {/* <MessageBox from={user}/> */}
            <div className="profile-container">
                <FriendList all_friends={user.friends}  />
                <MessageList all_msg={user.messages} />
            </div>
        </div>
    )
}

export default Profile