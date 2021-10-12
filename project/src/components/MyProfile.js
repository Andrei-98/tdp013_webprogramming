import React from "react";
import MessageBox from "./MessageBox";
import FriendRequests from "./FriendRequests";
import MessageList from "./MessageList";

function MyProfile({username, from, addMessage,update, friendRequests, addFriend, messages}) {

    return (  
        <div className="myprofile">
            <h1 className="username">{username}</h1>
            <div className="box-and-req-container">
            <FriendRequests requests={friendRequests} target={username} onAdd={addFriend} update={update} />
            <MessageBox to={username} from={from} onAdd={addMessage} />
            
            <div className="inviz-item"></div>
            </div> 
            
            <MessageList messages={messages} />

        </div>
    )
}
 
export default MyProfile;