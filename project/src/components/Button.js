import PropTypes from 'prop-types'
import { Component } from 'react'

export class Button extends Component {
    render() {
        return (
            <div>
                <button className="btn" style={{ backgroundColor: this.props.color }} onClick={this.props.onClick}>{this.props.text}</button>
            </div>
        )
    }
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