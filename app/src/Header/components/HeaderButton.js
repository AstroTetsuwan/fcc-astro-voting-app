import React, { Component } from 'react';

class HeaderButton extends React.Component {
    constructor(props){
        super(props);

        this.logos = {
            "Home": <i className="fas fa-home"></i>,
            "Sign In": <i className="fas fa-sign-in-alt"></i>, 
            "Sign Out": <i className="fas fa-sign-out-alt"></i>,
            "Sign Up": <i className="fas fa-user-plus"></i>,
            "My Polls": <i className="fas fa-archive"></i>,
            "New Poll": <i className="fas fa-plus-square"></i>
        };

        this.state = {content: this.props.text};   
         

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver(){
        this.setState({ 
            content: this.logos[this.props.text]});
    }

    handleMouseOut(){
        this.setState({
            content: this.props.text
        });
    }

    render(){
        

        return(
            <span onClick={this.props.userClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                {this.state.content}    
            </span>
        );
    }
}

export default HeaderButton;