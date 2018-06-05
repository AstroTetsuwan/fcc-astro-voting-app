import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

class NewPoll extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            minWidth: "100%",
            minHeight: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column nowrap"
        };

        this.state = {title: "", choices:["", ""]}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addChoiceInput = this.addChoiceInput.bind(this);
        this.newChoiceInput = this.newChoiceInput.bind(this);
        this.removeChoiceInput = this.removeChoiceInput.bind(this);
    }

    handleChange(e){
        //if id choice split("-") to target this.state.choices[id]
        const state = this.state;
        if(e.target.id === "title"){
            state.title = e.target.value;
        }
        else{
            var choiceIndex = e.target.id.split("-")[1];
            state.choices[choiceIndex] = e.target.value;
        }

        this.setState(state);
    }

    handleSubmit(e){
        e.preventDefault();
        
        var choices = [],
        nbrChoices = 0;
        for(var i=0; i < this.state.choices.length; i++){
            if(this.state.choices[i] !== ""){
                nbrChoices++;
                choices.push({choice: this.state.choices[i], nbrVotes: 0});
            }
        }
        if(nbrChoices < 2 && this.state.title === ""){
            const state = this.state;
            state.message = "You need at least 2 choices and a question.";
            this.setState(state);
        }
        else{
            var pollCreated = {
                title: this.state.title,
                choices: choices,
                authorId: this.props.match.params.userId
            }
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            axios.post("http://localhost:5000/api/poll", pollCreated)
            .then((result) => {               
                var redirectionUrl = "/poll/" + result.data._id;
                this.setState({redirection: <Redirect to={redirectionUrl}/>});
            })
            .catch((error) => {
                console.error(error);
                const state = this.state;
                state.message = "Sorry!!! There was a problem during creation. Try again!";
                this.setState(state);
            });
        }
    }

    addChoiceInput(){
        if(this.state.choices.length < 12){
            const state = this.state;
            state.choices.push("");
            this.setState(state);
        }
    }

    removeChoiceInput(e){
        if(this.state.choices.length > 2){
            var choiceIndex = e.target.id.split("-")[1];
            const state = this.state;
            state.choices.splice(choiceIndex, 1);
            this.setState(state);
        }
    }

    newChoiceInput(choiceId, choiceValue){
        var id = "choice-" + choiceId;
        var choiceInput = (<div key={choiceId} className="form-group" style={{margin: "10px 20px"}}>
                                <label>Choice:</label>
                                <div style={{display: "flex"}}>

                                    <input type="text" 
                                        className="form-control" 
                                        placeholder="Enter choice" 
                                        id={id}
                                        name={id}
                                        value={choiceValue}
                                        onChange={this.handleChange}/>

                                    <i className="fas fa-minus-circle fa-lg"
                                        id={id}
                                        onClick={this.removeChoiceInput}
                                        style={{padding: "10px 0 0 10px", cursor: "pointer"}}></i>
                                </div>
                            </div>
        );

        return choiceInput;
    }

    render(){
        var choicesInputRendered = []
        for(var i=0; i < this.state.choices.length; i++){
            choicesInputRendered.push(this.newChoiceInput(i, this.state.choices[i]));
        }

        return(
            <div style={this.style}>
                <h2>Create a new poll</h2>

                {this.state.message !== undefined &&
                    <div className="alert alert-warning alert-dismissible" role="alert">
                        { this.state.message }
                    </div>  
                }

                {this.state.redirection !== undefined &&
                    <div>{this.state.redirection}</div>
                }

                <form onSubmit={this.handleSubmit} style={{maxWidth: "80%", margin: "10px auto"}}>
                    <div className="form-group">
                        <label>Question:</label>
                        <input type="text" 
                        className="form-control" 
                        placeholder="Enter question" 
                        id={"title"}
                        name={"title"}
                        value={this.state.title}
                        onChange={this.handleChange}/>
                    </div>
                    <div style={{
                            display: "flex", 
                            flexFlow:"row wrap", 
                            justifyContent: "space-around"}}>
                        {choicesInputRendered}
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                       <p>
                           Add choice:&nbsp; &nbsp;  
                           <i onClick={this.addChoiceInput} 
                              style={{cursor: "pointer"}}
                              className="fas fa-plus-circle fa-lg"></i> 
                           <br/>- (Max 12 choices)
                        </p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button type="submit" style={{color:"#f7a440", backgroundColor:"#222"}}
                        className="btn btn-default hover-orange-btn">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewPoll;