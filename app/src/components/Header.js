import React, { Component } from 'react';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.style = {
            backgroundColor: "#222",
            color: "#eee"
        }
    }

    render(){
        return(
            <div>
                <h1>Astro Voting App</h1>
                <div><span>Sign In</span> or  <span>Sign Up</span></div>
            </div>
        );
    }

}

export default Header;