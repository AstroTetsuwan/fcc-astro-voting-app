import React, { Component } from 'react';
import HeaderButton from './components/HeaderButton';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.wrapperStyle = {
            backgroundColor: "#222",
            color: "#eee",
            minHeight:"10vh"
        };
        this.elementsWrapperStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
        this.h1Style = {
            margin: "0", 
            fontSize: "3em",
            padding: "10px"
        }; 
    }

    isLoggedIn(){
         return this.props.isLoggedIn ? 
            [<HeaderButton key={1} userClick={this.props.showUserPolls} text="My Polls"/>,
            <HeaderButton key={2} userClick={this.props.handleSignOut} text="Sign Out"/>] :
            [<HeaderButton key={3} userClick={this.props.handleSignIn} text="Sign In"/>,
            <HeaderButton key={4} userClick={this.props.handleSignUp} text="Sign Up"/>];
    }

    render(){

        return(
            <div className="row" style={this.wrapperStyle}>
                <div className="col-xs-12 col-md-9"  style={this.elementsWrapperStyle}>
                    <h1 style={this.h1Style}>
                        Astro Voting App
                    </h1>
                </div>
                <div className="col-xs-12 col-md-3" style={this.elementsWrapperStyle}>
                    <HeaderButton key={0} userClick={this.props.getBackHome} text="Home"/>    
                    {this.isLoggedIn()}
                </div>
            </div>
        );

    }

}

export default Header;