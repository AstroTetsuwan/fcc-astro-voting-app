import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header/Header';

import SignIn from './UserRegistration/SignIn';
import SignUp from './UserRegistration/SignUp';

import PollsGroup from './PollsGroup/PollsGroup';


class App extends Component {

  constructor(props){
    super(props);

    var userLoggedIn = localStorage.getItem("jwtToken") === null ? false : true;
    this.state = {
      isLoggedIn: userLoggedIn, 
      redirection: []
    };


    this.showUserPolls = this.showUserPolls.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignInSubmission = this.handleSignInSubmission.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpSubmission = this.handleSignUpSubmission.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.getBackHome = this.getBackHome.bind(this);
  }



  showUserPolls(){
    //MAIN COMPONENT == UserPoll
  }

  showPollDetails(e){
    //main COMPONENT === pollDetails,  pollId="e.target.id"
  }

  handleSignIn(){
    this.setState({
      isLoggedIn: false,
      redirection: [<Redirect to="/signin"/>]
    });
  }

  handleSignInSubmission(){
    this.setState({
      isLoggedIn: true,
      redirection: [<Redirect to="/"/>]
    });
  }
  
  handleSignUp(){
    this.setState({
      isLoggedIn: false,
      redirection: [<Redirect to="/signup"/>]
    });
  }

  handleSignUpSubmission(){
    this.setState({
      isLoggedIn: false,
      redirection: [<Redirect to="/signin"/>]
    });
  }

  handleSignOut(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  getBackHome(){
    var userLoggedIn = localStorage.getItem("jwtToken") === null ? false : true;
    this.setState({
      isLoggedIn: userLoggedIn, 
      redirection: [<Redirect to="/"/>]
    });
  }

  render() {
    return (
      <div className="container-fluid">
        
        <Header showUserPolls={this.showUserPolls}
                handleSignIn={this.handleSignIn}
                handleSignUp={this.handleSignUp}
                handleSignOut={this.handleSignOut}
                getBackHome={this.getBackHome}
                isLoggedIn={this.state.isLoggedIn}/>
        {this.state.redirection}
        <Switch>
            <Route exact path="/" component={PollsGroup}/>
            <Route path="/signin" render={() => <SignIn redirection={this.handleSignInSubmission}/>}/>
            <Route path="/signup" render={() => <SignUp redirection={this.handleSignUpSubmission}/>}/>
        </Switch>

      </div>
    );
  }
}

export default App;
