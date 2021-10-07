import React from 'react'
import { useState, useEffect } from 'react'
import SearchRes from './SearchRes';
import FriendList from './FriendList.js'

function Find({ user, update }) {


    const [users, setUsers] = useState(null)

    const [hasData, setData] = useState(false)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const fetchFriends = async () => {
            console.log(user.username)
            const res = await fetch(`http://localhost:9070/friends/${user.username}`)
            const data = await res.json()
            return data
        }

        const getProfile = async () => {
            const serverFriends = await fetchFriends()
            setFriends(serverFriends)
        }
        
        getProfile()
    }, [user])




    const handleSubmit = e => {
        e.preventDefault(); 

        fetch('http://localhost:9070/find/' + e.target[0].value, {
            method: 'GET',
        })
        .then((response) => {
            let stream = response.text();
            stream.then((res) => {
                res = JSON.parse(res);
                setUsers(users => res);
                setData(hasData => true);
            })
        }) 
    }


    return (  

        <div>
            <form method="GET" onSubmit={handleSubmit}>
                <input type="text" placeholder="Find user"></input>
                <input type="submit" value="Find"></input>
            </form>

            <div className="search_list">
                {hasData && users.map((us) => (
                    <SearchRes msg={us.username} user={user} update={update} className="msg"/>))}
            </div>
            {friends && <FriendList friends={friends} />}
        </div>  
    );
}
 
export default Find;