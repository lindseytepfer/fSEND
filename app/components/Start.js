import React, { useState } from "react";

export const Start = ( {pageEvent, setSubID, setRunID} ) => {

    return (

    <div id='intro-text'>

        <p>
        <input placeholder="Subject ID" onChange={(event) => {
            setSubID(event.target.value)}}/>
        
        <input placeholder="Run ID" onChange={(event) => {
            setRunID(event.target.value)}}/>
        </p>

        <button onClick={pageEvent}>SUBMIT</button>
    </div>

    );
};