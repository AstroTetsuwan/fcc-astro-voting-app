import React from "react";
import axios from 'axios';

import HeadDetails from './components/HeadDetails';
import VotesChoices from './components/VotesChoices';
import VotesGraph from './components/VotesGraph';

class Poll extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            pollDetails: "",
            isLoading: false
        };

        this.style = {
            margin: "20px",
            display: "flex",
            flexFlow: "column nowrap",
            maxHeight: "400px"         
        };

        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount(){

        this.setState({
            pollDetails: "",
            isLoading: true
        });

        console.log(this.props.match.params.id);

        var path = "http://localhost:5000/api/poll/details/" + this.props.match.params.id;
        axios.get(path)
        .then((results) => {
            
            this.setState({
                pollDetails: this.setPage(results),
                isLoading: false
            });

        }, (err) => {
            console.log(err);
        });
    }

    setPage(results){
        var poll = results.data;
            var pollsDetails = [];
            var date = new Date(poll.creationDate);
            date = date.toLocaleString("en-GB", {timeZone: "UTC"});
            
            pollsDetails.push(<HeadDetails key={1} 
                                title={poll.title} 
                                username={poll.author.username} 
                                date={date}/>);
            

            var colors = ['#ffffe0','#ffefd3','#ffdec7','#ffcebc','#febdb2',
                            '#fdaca8','#fc9a9f','#fc8698','#7ba7a7','#669aac','#568eb0','#4682b4'];
           


            var bottomStyle =  {
                display: "flex", 
                flexFlow: "row wrap",
                minHeight: "100%",
                marginBottom: "20px"
            };                  

            var bottomDiv = (
                <div key={2} style={bottomStyle}>
                    <VotesChoices  choices={poll.choices} colors={colors} handleVote={this.handleVote} />
                    
                    <VotesGraph  choices={poll.choices} colors={colors}/>
                </div>
            );


            pollsDetails.push(bottomDiv);

            return pollsDetails;
    }

    handleVote(e){
        var choiceIndex = e.target.id.split("-")[1];
        
        this.setState({
            pollDetails: "",
            isLoading: true
        });

        var path = "http://localhost:5000/api/poll/vote/" + 
                    this.props.match.params.id + "/" + choiceIndex;
        axios.get(path)
        .then((results) => {

            this.setState({
                pollDetails: this.setPage(results),
                isLoading: false
            });
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

                {this.state.pollDetails}
            </div>
        );
    }
}



export default Poll;