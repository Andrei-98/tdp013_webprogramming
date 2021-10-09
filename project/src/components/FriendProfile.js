import React from "react";
import MessageBox from "./MessageBox";
import FriendRequests from "./FriendRequests";
import MessageList from "./MessageList";

function FriendProfile({username, from, addMessage, friendRequests, addFriend, messages}) {


    
    return (  
        <div>
            <h1>{username}</h1>
            <MessageBox to={username} from={from} onAdd={addMessage} />
            <div className="profile-container"> 
                <MessageList messages={messages} />
            </div>
        </div>
    )
}
     
 
export default FriendProfile;