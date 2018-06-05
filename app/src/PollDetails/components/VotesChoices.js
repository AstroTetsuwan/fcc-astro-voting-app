import React from "react";

function VotesChoices(props){
    var buttons = [];
    for(var i=0; i < props.choices.length; i++){
        buttons.push(
            <button type="button" 
            className="btn btn-block btn-vote"
            onClick={props.handleVote}
            id={"choice-" + i} key={i}
            style={{maxHeight: "40px", backgroundColor: props.colors[i], color:"#111"}}>
                {props.choices[i].choice}
            </button>
        );
    }

    var wrapperStyle = {
        flex: "1", 
        minHeight: "100%",
        backgroundColor: "#222",
        borderRadius: "10px", 
        padding: "20px",
        boxShadow: "0 5px 10px -5px",
        marginRight: "20px"
    };

    var style = {
        marginTop: "20px"
    };

    return(
        <div style={wrapperStyle}>
            <h4 style={{color: "#f7a440"}}>I vote :</h4>
            <div style={style}>          
                {buttons}
            </div>
        </div>
    );
}

export default VotesChoices;