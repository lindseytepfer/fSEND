import React from "react";

export const Start = ( { pageEvent, setSubID } ) => {

    return (
        <>
        <div>
            <p id='question'>Please enter the subject ID:</p>
            <input placeholder="subject ID" onChange={(event) => {
            setSubID(event.target.value)}}/>
        </div>
        <div>
            <button onClick={pageEvent}>SUBMIT</button>
        </div>
    </>

    );
};