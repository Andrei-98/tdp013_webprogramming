import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState } from 'react'
import MessageBox from './MessageBox'
import Navigation from './Navigation.js'
import React from 'react';


function OtherProfile({ user }) {

    //const [user2, setUser] = useState(user);
    

    return (
        <div className="myprofile">
           
            <h1>{}</h1>
          
            <div className="profile-container">
               
            </div>
        </div>
    )
}

export default OtherProfile;