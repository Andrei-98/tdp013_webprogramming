import React from 'react'

import MessageList from './MessageList'
import { useState, useEffect } from 'react'
import MessageBox from './MessageBox'
import FriendRequests from './FriendRequests.js'

function Profile({from, to=window.location.pathname.split("/").pop(), showRequests}) {

    const [messages, setMessages] = useState([])
    const [friendRequests, setFriendRequests] = useState([])


    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(`http://localhost:9070/messages/${to}`)
            const data = await res.json()
            return data
        }
    
        const fetchRequests = async () => {
            const res = await fetch(`http://localhost:9070/fr/${to}`)
            const data = await res.json()
            return data
        }

        const getProfile = async () => {
            const serverMessages = await fetchMessages()
            setMessages(serverMessages)
            const serverRequests = await fetchRequests()
            setFriendRequests(serverRequests)
        }
        
        
        getProfile()
    }, [to])


    // Add Message
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile', {
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
            <h1>{to}</h1>
            <MessageBox to={to} from={from} onAdd={addMessage} />
            <div className="profile-container">
                {/* bad fix maybe? */}
                {showRequests && friendRequests && <FriendRequests requests={friendRequests} target={to} onAdd={addFriend}/>}
                {messages && <MessageList messages={messages} />}
            </div>
        </div>
    )
}

export default Profile