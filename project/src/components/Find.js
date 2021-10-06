import { updateExpression } from '@babel/types';
import React from 'react'
import { useState, useEffect } from 'react'
import Message from './Message';
import SearchRes from './SearchRes';

function Find({ user }) {

    const [users, setUsers] = useState(null);

    const [hasData, setData] = useState(false);

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
                    <SearchRes msg={us.username} user={user} className="msg"/>))}
            </div>
        </div>  
    );
}
 
export default Find;