import React from 'react'
import { useState, useEffect } from 'react'
import NotFriend from './NotFriend'
import { useParams } from 'react-router'
import MyProfile from './MyProfile'
import InvalidProfile from './InvalidProfile'
import FriendProfile from './FriendProfile'

function Profile({from, user, showRequests, update}) {

    const { username } = useParams()
    const [messages, setMessages] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const [invalid_user, setInvalid] = useState(false);
    
    let other_profile = true;
    
    if(username == from)
    {
        other_profile=false;
    }
   
    
    useEffect(() => {
        // const fetchMessages = async () => {
        //     const res = await fetch(`http://localhost:9070/messages/${username}`)
        //     const data = await res.json()
        //     return data
        // }

        const validProfile = async () => {
            const res = await fetch(`http://localhost:9070/profile/${username}`)
            if (Number(res.status) == 400)
                return null;
            const data = await res.json()
            return data
        }
    
        // const fetchRequests = async () => {
        //     const res = await fetch(`http://localhost:9070/fr/${username}`)
        //     const data = await res.json()
            
        //     return data
        // }

        const getProfile = async () => {
            const valid_user = await validProfile();
            if(valid_user != null)
            {
                setMessages(valid_user.messages);
                setFriendRequests(valid_user.received_req);
                setInvalid(false);
            }
            else
            {
                setInvalid(true);
            }
            // const serverRequests = await fetchRequests()
            
        }
           
            getProfile()
    }, [username])

    const isFriend = () => {
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
            <div>
                {invalid_user && <InvalidProfile />}
                {!other_profile && <MyProfile username={username} from={from} addMessage={addMessage} update={update} friendRequests={friendRequests} addFriend={addFriend} messages={messages} />}
                {other_profile && isFriend() && <FriendProfile username={username} from={from} addMessage={addMessage} friendRequests={friendRequests} addFriend={addFriend} messages={messages} />}
                {!isFriend() && other_profile && !invalid_user && <NotFriend user={user} update={update} />}
            </div>
        </div>
    )
}

export default Profile