import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState } from 'react'
import MessageBox from './MessageBox'

function Profile({ user }) {

    //const [user2, setUser] = useState(user);
    

    return (
        <div>
            <h1>John</h1>
            <MessageBox from="John"/>
            <div className="profile-container">
                <FriendList all_friends={user.friends}  />
                <MessageList user="John" />
            </div>
        </div>
    )
}

export default Profile