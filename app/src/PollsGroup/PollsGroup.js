import React, { Component } from 'react';
import axios from 'axios';

import PollBar from "./PollBar";

class PollsGroup extends React.Component {

    constructor(props){
        super(props);

        this.style = {
            margin: "20px",
            borderRadius: "10px",
            backgroundColor: "#aaa"
        };

        this.state = {polls: []};
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/poll")
        .then((results) => {
            
            var polls = [];
            
            results.data.forEach((element, index) => {
                console.log(element);
                polls.push(<PollBar key={index} title={element.title} 
                            author={element.authorId} 
                            creationDate={element.creationDate}/>);   
                
                //setState inside loop so it wait for changes before to render.  
                this.setState({
                    polls: polls
                });
            });

            
        })
        .catch((err) => {
            console.error(err)
        });
    }

    render(){
        return(
            <div style={this.style}>
                {this.state.polls}
            </div>
        );
    }
}

export default PollsGroup;