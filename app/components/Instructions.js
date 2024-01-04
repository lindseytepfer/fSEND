import React, { useState, useEffect } from "react";

export const Instructions = ( {pageEvent, runID, setRunID} ) => {

    const [volume, setVolume] = useState(false)

    const showVideo = () => {
        setVolume(true);
    }

    useEffect(() => {
        if (runID === "") {
            setRunID(1);
        }
    }, []); 

    return (
    <div id='intro-text'>
        {!volume &&
        <div>
            <h1>Welcome to the <br />Personal Narratives Study!</h1>

            <p>
                In this study, you will watch several videos of individuals
                narrating personal moments in their lives, as well as two
                longer videos of characters in a TV show and a short film.  
            </p>

            <p>
                After the scan session is complete, you will be taken to
                another room to share your impressions of the videos, answer 
                two short questionnaires, and a quick debrief of the overall study.
            </p>

            <button onClick={showVideo}> test volume </button><br/><br/>
        </div>
        }

        {volume &&
        <div>
            <video src="/stimuli/soup.mp4" width="950" height="450" controls={true} autoPlay={true}>Unable to load video.</video>
        
            <button onClick={pageEvent}>Please remember to stay still during the course of the experiment! </button>
        </div>
        }

    </div>
    );
};