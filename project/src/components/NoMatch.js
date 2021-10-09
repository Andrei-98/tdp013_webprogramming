import React from 'react'


function NoMatch({msg = "404 error no page found"}){



    return (
        <div>
            <h1>{msg}</h1>
        </div>
    )
}

export default NoMatch
