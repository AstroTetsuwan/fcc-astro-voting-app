import React from "react";

function HeadDetails(props){
    var style = {
        marginBottom: "20px",
        color: "#f7a440"
    };
    return(
        <div style={style}>
            <h2>{props.title}</h2>
            <h5>{props.username} - {props.date}</h5>
        </div>
    );
}

export default HeadDetails;