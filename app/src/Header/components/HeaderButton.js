import React, { Component } from 'react';

class HeaderButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {color: "#428bca", bgColor: "#222"};    

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver(){
        this.setState({color: "#5bc0de", bgColor: "#444"});
    }

    handleMouseOut(){
        this.setState({color: "#428bca", bgColor: "#222"});
    }

    render(){
        var style = {
            color: this.state.color,
            backgroundColor: this.state.bgColor,
            padding: "2px 5px",
            margin: "5px",
            cursor: "pointer",
            fontSize: "1.2em",
            border: "1px solid #eee",
            borderRadius: "5px"
        };

        return(
            <span style={style}
                onClick={this.props.userClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                {this.props.text}    
            </span>
        );
    }
}

export default HeaderButton;