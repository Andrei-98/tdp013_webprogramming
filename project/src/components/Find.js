import React from 'react'
import { useState } from 'react'
import SearchRes from './SearchRes';
import FriendList from './FriendList.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import verifyMessage from '../validation'

function Find({ user, update }) {

    const [users, setUsers] = useState(null)
    const [error, setError] = useState("")

    const resetError = () => { setError(error => "") }


    const getUsers = (getuser) => {
        fetch(`http://localhost:9070/find/${getuser}`, {
            method: 'GET',
        })
            .then((response) => {
                let stream = response.text();
                stream.then((res) => {
                    if (response.status != 200) {
                        return;
                    }
                    res = JSON.parse(res);

                    // this dosent work
                    // if (res.length === 1) {
                    //     setError("No users with that name.")
                    // }
                    setUsers(res);
                })
            })

    }


    const handleSubmit = (e) => {
        e.preventDefault(e.target[0].value)

        let status = verifyMessage(e.target[0].value)

        if (status === "") {
            getUsers(e.target[0].value)
            
        } else {
            setError(status)
        }
    }


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

            <span>{error}</span>

            <div className="search_list">
                {users && users.map((us) => (
                    <SearchRes
                        msg={us.username}
                        user={user}
                        update={update}
                        className="msg"
                    />))}

            </div>

        </div>
    );
}

export default Find;