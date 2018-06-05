import React from 'react';

import { VictoryPie } from "victory-pie";

class VotesGraph extends React.Component{

    constructor(props){
        super(props);
        var choices = [];
        var countVotesZero = 0;
        for(var i=0; i < this.props.choices.length; i++){
            choices.push({
                x: this.props.choices[i].choice,
                y: this.props.choices[i].nbrVotes 
            });
            if(this.props.choices[i].nbrVotes == 0){countVotesZero++;}
        }

        //IF NO VOTES AT ALL - DON'T RENDER THE PIE CHART - IT'S UGLY
        if(this.props.choices.length == countVotesZero){
            this.state = {data: [], text:"There is no vote yet for this poll. Vote and make your voice heard!"}
        }
        
        else{    
            this.state = { data: choices, text: ""};
        }
    }
    

    
    

    render(){
        var style = {
            flex: "1", 
            minHeight: "100%",
            backgroundColor: "#222",
            borderRadius: "10px", 
            padding: "20px",
            boxShadow: "0 5px 10px -5px",
            display: "flex", justifyContent: "center", alignItems: "center"
        }

        return(
            <div style={style}>
                {this.state.text === ""  &&
                    <VictoryPie 
                        colorScale={this.props.colors} 
                        data={this.state.data}
                        labels={(d) => `${d.y}`}
                        padAngle={3}
                        innerRadius={50}
                        labelRadius={120}
                        style={{ labels: { fill: "#222", fontSize: 20, fontWeight: "100" } }}/>
                }
                {this.state.text}
            </div>
        );
    }
}

export default VotesGraph;