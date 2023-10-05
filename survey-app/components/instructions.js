import React from "react";

export const Instructions = ( { pageEvent } ) => {
    return(
        <div id='question'>
        <p><strong>Thank you for completing Part I of the Personal Narratives Study.</strong></p>
            
        <p> 
            In this section, you will be asked to make several ratings on all
            of the individuals you listened to while in the scanner. 

            You will rate each person on a scale of 1-7 on the following traits:<br /><br />

            <span style={{color: '#15b08e'}}><em>bossy, easygoing, nosy, conscientious, humble, and rebellious</em></span>

            <br/><br />
            where 1 represents "not at all" and 7 represents "very".

            <br/><br />
            You will be given a brief description of each trait's definition 
            before you make a rating. 

            <br/><br />
            When you're ready to begin, please press the 'start' button below. 
        </p>
        <button onClick={pageEvent}>Start</button>
        </div>
    );
};