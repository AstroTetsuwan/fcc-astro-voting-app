import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom'; 

import PollBar from "./components/PollBar";

class PollsGroup extends React.Component {

    constructor(props){
        super(props);

        this.style = {
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            flexFlow: "row wrap"            
        };

        this.state = {polls: [], isLoading: false};
    }

    componentDidMount(){
        this.setState({
            polls: [],
            isLoading: true
        });
        
        axios.get("http://localhost:5000/api/poll")
        .then((results) => {           
            var polls = [];

            for(var i=0; i < results.data.length; i++){
                var redirection =  "/poll/" + results.data[i]._id;
                console.log(results);
                polls.push(<Link to={redirection} className="pollLink" key={i} style={{margin: "20px"}}>
                                <PollBar title={results.data[i].title} 
                                author={results.data[i].author.username} 
                                creationDate={results.data[i].creationDate}/>
                            </Link>);
            }
            this.setState({ 
                polls: polls,
                isLoading: false
            });          
        },
        (err) => {
            console.error(err)
        });
    }

    render(){
        return(
            <div style={this.style}>

            {this.state.isLoading === true &&
                <div className="loadingWrapper">
                    <i className="fas fa-spinner fa-pulse fa-3x" style={{marginBottom: "20px"}}></i>
                    <p style={{fontSize: "1.5em", paddingLeft: "15px"}}>Loading...</p>
                </div>
            }

                {this.state.polls}
            </div>
        );
    }
}

export default PollsGroup;