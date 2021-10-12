import React from 'react'
import { useState } from 'react'
import SearchRes from './SearchRes';
import FriendList from './FriendList.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Find({ user, update }) {


    const [users, setUsers] = useState(null)
    // const [friends, setFriends] = useState([])
    const [error, setError] = useState("")


    // useEffect(() => {
    //     const fetchFriends = async () => {
    //         const res = await fetch(`http://localhost:9070/friends/${user.username}`)
    //         const data = await res.json()
    //         return data
    //     }

    //     const getProfile = async () => {
    //         const serverFriends = await fetchFriends()
    //         setFriends(serverFriends)
    //     }

    //     getProfile()
    // }, [user])


    const handleSubmit = e => {
        e.preventDefault(); 
        console.log(e.target[0].value)
        fetch('http://localhost:9070/find/' + e.target[0].value, {
            method: 'GET',
        })
        .then((response) => {
            let stream = response.text();
            stream.then((res) => {
                if (response.status != 200) {
                    return;
                }
                if (res.length === 2) {
                    setError("No users with that name.")
                }
                res = JSON.parse(res);
                setUsers(users => res);
            })
        })
    }

    const resetError = () => { setError(error => "") }

    return (

        <div className="myprofile">
            <div className="profile-container">
            {user.friends && <FriendList friends={user.friends} />}
            <Form className="find" onSubmit={handleSubmit} method="GET">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Find user"
                        onInput={resetError}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Find</Button>{' '}
            </Form>
            <div className="inviz-item"></div>
            </div>

            <div className="search_list">
                {users && users.map((us) => (
                    <SearchRes msg={us.username} user={user} update={update} className="msg" />))}
                <span>{error}</span>
            </div>
            
        </div>
    );
}

export default Find;