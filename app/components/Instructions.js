import React from "react";

export const Instructions = ( {pageEvent} ) => {

    return (
    <>
        <h1>Welcome to the Personal Narratives Study!</h1>

        <p>
            In this study, you watch several videos of individuals
            narrating personal moments in their lives, as well as two
            longer videos of characters in a TV show and a short film.  
        </p>

        <p>
            After the scan session is complete, you will be taken to
            another room to share your impressions of the videos, answer 
            two short questionnaires, and a quick debrief of the overall study.
        </p>
        <strong>
            Please remember to stay still during the course of the experiment.
        </strong>
        <p>
            Click the button below if you understand and are ready to proceed.
        </p>

        <button onClick={pageEvent}>CONTINUE</button>
    </>
    );
};