import React from 'react'
import SearchRes from './SearchRes';

function NotFriend({user, update}) {

    const to = window.location.pathname.split("/").pop()
    return (
        <div>
            <h1>You are not friends with this user!</h1>
            <SearchRes msg={to} user={user} update={update} className="msg"/>
        </div>
    )
}

export default NotFriend
