import React, { Component } from 'react';

import axios from 'axios';

class UserPolls extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            userPolls: []
        };

        this.style = {
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minWidth: "100%"       
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){

        this.setState({
            userPolls: [],
            isLoading: true
        });

        var path = "http://localhost:5000/api/poll/userpolls/" + this.props.match.params.userId;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get(path)
        .then((results) => {  

            var pollsRows = this.setTable(results);

            this.setState({ 
                userPolls: pollsRows,
                isLoading: false
            });
        },
        (err) => {
            console.error(err);
        });
    }

    setTable(results){
        var pollsRows = [];
        for(var i=0; i < results.data.length; i++){

            var thisPollChoices = [];
            var totalVotes = 0;
            for(var j=0; j < results.data[i].choices.length; j++){
                thisPollChoices.push(
                    <p key={j}>
                        <span>{results.data[i].choices[j].choice}: </span>
                        <span>{results.data[i].choices[j].nbrVotes}</span>
                    </p>
                );

                totalVotes += results.data[i].choices[j].nbrVotes;
            }

            var date = new Date(results.data[i].creationDate);
            date = date.toLocaleString("en-GB", {timeZone: "UTC"});

            var name = "pollsRow-" + i; 

            pollsRows.push(
                <tr key={i}>
                    <td>{results.data[i].title}</td>
                    <td>{thisPollChoices}</td>
                    <td>{totalVotes}</td>
                    <td>{date}</td>
                    <td>
                        <i className="fas fa-trash-alt" 
                        onClick={this.handleDelete}
                        style={{cursor: "pointer"}}
                        id={results.data[i]._id}
                        name={name}></i>
                    </td>
                </tr>
            );
        }
        return pollsRows;
    }

    handleDelete(e){
        var pollId = e.target.id;
        var indexInThisUserPolls = e.target.getAttribute('name').split("-")[1];
        //send delete request to api, if res ok, delete in this.state with index and setState

        var path = "http://localhost:5000/api/poll/userpolls/" + pollId;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.delete(path, {method: 'DELETE'})
        .then((results) => {
            console.log(results);
            const state = this.state;
            state.userPolls.splice(indexInThisUserPolls, 1);
            this.setState(state);
        },
        (err) => {
            console.error(err);
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
                
                {this.state.userPolls.length > 0 &&
                    <table className="user-table">
                        <thead>
                            <tr id="tableFirstRow">
                                <th>Question</th>
                                <th>Choice: votes for</th>
                                <th>Total Votes</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userPolls}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default UserPolls;