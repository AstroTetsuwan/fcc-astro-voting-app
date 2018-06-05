import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header/Header';

import SignIn from './UserRegistration/SignIn';
import SignUp from './UserRegistration/SignUp';

import PollsGroup from './PollsGroup/PollsGroup';
import NewPoll from './UserPolls/NewPoll';
import UserPolls from './UserPolls/UserPolls'

import Poll from './PollDetails/Poll';


class App extends Component {

  constructor(props){
    super(props);

    var userLoggedIn = localStorage.getItem("jwtToken") === null ? false : true;
    this.state = {
      user: null,
      isLoggedIn: userLoggedIn, 
      redirection: []
    };

    this.handleSignInSubmission = this.handleSignInSubmission.bind(this);
    this.handleSignUpSubmission = this.handleSignUpSubmission.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount(){
    const state = this.state;
    state.isLoggedIn = localStorage.getItem("jwtToken") === null ? false : true;
    this.setState(state);
  }


  handleSignInSubmission(user){
    this.setState({
      user: user,
      isLoggedIn: true,
      redirection: <Redirect to="/"/>
    });
  }

  handleSignUpSubmission(){
    this.setState({
      user: null,
      isLoggedIn: false,
      redirection: <Redirect to="/signin"/>
    });
  }

  handleSignOut(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }


  render() {
    return (
      <div className="container-fluid">
        
        <Header handleSignOut={this.handleSignOut} user={this.state.user}/>

        {this.state.redirection}

        <Switch>
            <Route exact path="/" component={PollsGroup}/>
            <Route path="/signin" render={() => <SignIn redirection={this.handleSignInSubmission}/>}/>
            <Route path="/signup" render={() => <SignUp redirection={this.handleSignUpSubmission}/>}/>
            <Route path="/poll/:id" component={Poll}/>
            <Route path="/newpoll/:userId" component={NewPoll}/>
            <Route path="/userpoll/:userId" component={UserPolls}/>
        </Switch>

      </div>
    );
  }
}

export default App;
