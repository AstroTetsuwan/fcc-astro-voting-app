import React from 'react';

function PollBar(props){
    var randomSize = (Math.floor(Math.random() * 100) + 71) + "px";
    var style = {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItem: "center",
        padding: "5px 10px 0 10px",
        cursor: "pointer",
        backgroundColor: "#222",
        height: "250px",
        width: "250px",
        borderRadius: "100%"
    };
    var titleStyle = {
        fontSize: "1.2em", 
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
        alignItem: "center"
    };
    var metaStyle = {
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        fontSize: ".9em"
    }; 

    var date = new Date(props.creationDate);;;
    date = date.toLocaleString("en-GB", {timeZone: "UTC"})

    return(
        <div style={style} className="hvr-float-shadow">
            <div style={titleStyle}>
                <span style={{textAlign: "center"}}>{props.title}</span>
            </div>
            <div style={metaStyle}>
                <span>{props.author} -&nbsp;{date}</span>
            </div>
        </div>
    );
}

export default PollBar;