import React from "react";
import MessageBox from "./MessageBox";

import MessageList from "./MessageList";

function FriendProfile({username, from, addMessage, messages}) {


    
    return (  
        <div className="myprofile">
            <h1>{username}</h1>
            <MessageBox to={username} from={from} onAdd={addMessage} />
            <div className="profile-container"> 
                <MessageList messages={messages} />
            </div>
        </div>
    )
}
     
 
export default FriendProfile;