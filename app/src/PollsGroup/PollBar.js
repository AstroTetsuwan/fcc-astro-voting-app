import React from 'react';

function PollBar(props){
    var style = {
        display: "flex",
        justifyContent: "space-around",
        alignItem: "center",
        padding: "5px 10px 0 10px",
        cursor: "pointer"
    };
    var titleStyle = {
        flex: "1",
        fontSize: "1.2em", 
        paddingBottom: "3px"
    };
    var metaStyle = {
        display: "flex",
        flex: "1",
        justifyContent: "flex-end"
    }; 


    return(
        <div style={style}>
            <div style={titleStyle}>
                <span>{props.title}</span>
            </div>
            <div style={metaStyle}>
                <span>{props.author} -&nbsp;</span>
                <span>{props.creationDate}</span>
            </div>
        </div>
    );
}

export default PollBar;