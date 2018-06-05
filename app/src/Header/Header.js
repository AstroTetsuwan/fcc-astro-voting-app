import React, { Component } from 'react';

import { Link } from 'react-router-dom'; 

import HeaderButton from './components/HeaderButton';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.wrapperStyle = {
            backgroundColor: "#222",
            color: "#f7a440",
            minHeight:"10vh"
        };
        this.elementsWrapperStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "row wrap"
        };

        this.userGreetingAndButtonWrapperStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column nowrap"
        };

        this.h1Style = {
            margin: "0", 
            fontSize: "3.2em",
            padding: "10px"
        }; 
    }

    isLoggedIn(){
        if(this.props.user !== null){
            var userPollsLink = "/userpoll/" + this.props.user._id,
                NewPollLink = "/newpoll/" + this.props.user._id;
            
            return [<Link to={userPollsLink} className="navLink" key={1}>
                        <HeaderButton text="My Polls"/>
                    </Link>,
                    <Link to={NewPollLink} className="navLink" key={2}>
                        <HeaderButton className="navLink" text="New Poll"/>
                    </Link>,
                    <Link to="" className="navLink" key={3}>
                        <HeaderButton className="navLink" userClick={this.props.handleSignOut} text="Sign Out"/>
                    </Link>];
        } else{
         return [<Link to="/signin" className="navLink" key={4}>
                    <HeaderButton text="Sign In"/>
                </Link>,
                <Link to="/signup" className="navLink" key={5}>
                    <HeaderButton text="Sign Up"/>
                </Link>];
        }
    }

    render(){
        return(
            <div className="row" style={this.wrapperStyle}>
                <div className="col-xs-12 col-md-8"  style={this.elementsWrapperStyle}>
                    <h1 style={this.h1Style}>
                        Astro Voting App
                    </h1>
                </div>
                <div className="col-xs-12 col-md-4" style={this.userGreetingAndButtonWrapperStyle}>
                    {this.props.user !== null &&
                        <div style={{margin: "10px 0 -10px 0"}}>
                            <p style={this.elementsWrapperStyle}>
                                Welcome {this.props.user.username}
                            </p>
                        </div>
                    }
                    <div style={this.elementsWrapperStyle}>
                        <Link to="/" className="navLink" key={0}>
                            <HeaderButton  text="Home"/>    
                        </Link>
                        {this.isLoggedIn()}
                    </div>
                </div>
            </div>
        );

    }

}

export default Header;