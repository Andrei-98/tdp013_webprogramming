import React from 'react'
import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState, useEffect } from 'react'
import MessageBox from './MessageBox'
import Navigation from './Navigation.js'

function Profile({ user, logout }) {

    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const getProfile = async () => {
            const serverFriends = await fetchFriends()
            setFriends(serverFriends)
            const serverMessages = await fetchMessages()
            setMessages(serverMessages)
        }

        getProfile()
    }, [])

    
    // Fetch Messages
    const fetchMessages = async () => {
        const res = await fetch(`http://localhost:9070/messages/${user}`)
        const data = await res.json()
        return data
    }


    // Add Message
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        })
        setMessages([msg, ...messages])
        const data = await res.json()
        // setMessages([...messages, data])
    }


    // Fetch Friend List
    const fetchFriends = async () => {
        const res = await fetch(`http://localhost:9070/friends/${user}`)
        const data = await res.json()
        return data
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <MessageBox from="John" onAdd={addMessage} />
            <div className="profile-container">
                {friends && <FriendList friends={friends} />}
                {messages && <MessageList messages={messages} />}
            </div>
        </div>
    )
}

export default Profile