import React from 'react'

import MessageList from './MessageList'
import { useState, useEffect } from 'react'
import MessageBox from './MessageBox'
import FriendRequests from './FriendRequests.js'
import NotFriend from './NotFriend'
import { useParams } from 'react-router'

function Profile({from, user, showRequests, update={update}}) {

    const { username } = useParams()
    
    const [messages, setMessages] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    
    let other_profile = true
    let invalid_profile = false;
    if(username == from)
    {
        other_profile=false;
    }

    useEffect(() => {
        const validProfile = async () => {
            const res = await fetch(`http://localhost:9070/profile/${username}`)
            return res.status == 200
        }

        const fetchMessages = async () => {
            const res = await fetch(`http://localhost:9070/messages/${username}`)
            const data = await res.json()
            return data
        }
    
        const fetchRequests = async () => {
            const res = await fetch(`http://localhost:9070/fr/${username}`)
            const data = await res.json()
            
            return data
        }

        const getProfile = async () => {
            const serverMessages = await fetchMessages()
            setMessages(serverMessages)
            const serverRequests = await fetchRequests()
            
            setFriendRequests(serverRequests)
        }
        
        if (validProfile())
        {
            getProfile()
        }
        else
        {
            invalid_profile = true;
        }
    }, [username])

    const isFriend = () => {

        if(!other_profile)
        {
            return true;
        }
        return user.friends.includes(username);
      }
    // Add Message
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile/' + username, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        })
        setMessages([msg, ...messages])
        await res.json()
        // setMessages([...messages, data])
    }


    const addFriend = async (friend) => {

        // delete friend.sender from friendRequest client side
        setFriendRequests(friendRequests.filter((request) => request !== friend.sender))

        const res = await fetch('http://localhost:9070/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(friend)
        })

        await res.json()
    }

    return (
        <div> 
            <h1>{username}</h1>
            {console.log(invalid_profile)}
            {isFriend() && <MessageBox to={username} from={from} onAdd={addMessage} />}
            <div className="profile-container">
                {/* bad fix maybe? */}
                {!other_profile && isFriend() && friendRequests  && <FriendRequests requests={friendRequests} target={username} onAdd={addFriend}/>}
                {messages && isFriend() && <MessageList messages={messages} />}
                {!isFriend() &&  <NotFriend user={user} update={update}/>}
            </div>
        </div>
    )
}

export default Profile