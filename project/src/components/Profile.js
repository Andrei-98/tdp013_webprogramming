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
    const [init, setInit] = useState(false);
    
    let other_profile = true;
    
    if(username === from)
    {
        other_profile=false;
    }
   
    
    useEffect(() => {
        const validProfile = async () => {
            const res = await fetch(`http://localhost:9070/profile/${username}`)
            if (Number(res.status) === 400)
                return res.status;
            const data = await res.json()
            return data
        }
    
        const getProfile = async () => {
            const valid_user = await validProfile();
            if(valid_user != 400)
            {
                setMessages(valid_user.messages);
                setFriendRequests(valid_user.received_req);
                setInvalid(false);
            }
            else
            {
                setInvalid(true);
            }
            setInit(true);
        }
           
            getProfile()
    }, [username])

    const isFriend = () => {
        return user.friends.includes(username);
      }
      
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile/' + username, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        })
        setMessages([msg, ...messages])
        await res.status
    }


    const addFriend = async (friend) => {

        setFriendRequests(friendRequests.filter((request) => request !== friend.sender))

        const res = await fetch('http://localhost:9070/find', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(friend)
        }).then((response) => {
            update();
            return response.status;
        })

    }


    return (
        <div className="profile-container grey-1"> 
            <>
                {init && invalid_user && <InvalidProfile />}
                {init && !other_profile && <MyProfile username={username} from={from} addMessage={addMessage} update={update} friendRequests={friendRequests} addFriend={addFriend} messages={messages} />}
                {init && other_profile && isFriend() && <FriendProfile username={username} from={from} addMessage={addMessage} friendRequests={friendRequests} addFriend={addFriend} messages={messages} />}
                {init && !isFriend() && other_profile && !invalid_user && <NotFriend user={user} update={update} />}
            </>
        </div>
    )
}

export default Profile