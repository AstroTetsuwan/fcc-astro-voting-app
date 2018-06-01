import React, { Component } from 'react';


import PollsGroup from './PollsGroup/PollsGroup';

import SignIn from './UserRegistration/SignIn';
import SignUp from './UserRegistration/SignUp';

class Main extends React.Component{

    constructor(props){
        super(props);

        this.style = {
            minWidth: "100%",
            minHeight: "90vh"
        };

        var page = this.getPageComponent(props.page);
        this.state = {
            page: page,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.state.page) {
          this.setState({ page: this.getPageComponent(nextProps.page) });
        }
    }

    getPageComponent(propsPage){
        var page;
        switch(propsPage){
            case "home":
                page = <PollsGroup/>
                break;

            case "signIn":
                page = <SignIn/>
                break;

            case "signUp":
                page = <SignUp/>
                break;
        }
        return page;
    }


    render(){

        return(
            <div style={this.style} >
                {this.state.page}
            </div>
        );

    }

}

export default Main;