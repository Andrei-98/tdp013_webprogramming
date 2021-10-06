import React from 'react'
import PropTypes from 'prop-types'

function Button({color, text, onClick }) {
    return (
        <div>
            <button className="btn" style={{ backgroundColor: color }} onClick={onClick}>{text}</button>
        </div>
    )
}


Button.defaultProps = {
    color: "green",
    text: "Add",
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}


export default Button;