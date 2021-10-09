import React from "react";
import MessageBox from "./MessageBox";
import FriendRequests from "./FriendRequests";
import MessageList from "./MessageList";

function MyProfile({username, from, addMessage,update, friendRequests, addFriend, messages}) {

    return (  
        <div>
            <h1>{username}</h1>
            <MessageBox to={username} from={from} onAdd={addMessage} />
            <div className="profile-container"> 
                <FriendRequests requests={friendRequests} target={username} onAdd={addFriend} update={update} />
                <MessageList messages={messages} />
            </div>
        </div>
    )
}
 
export default MyProfile;