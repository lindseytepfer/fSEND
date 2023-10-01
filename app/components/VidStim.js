import React, { useState, useEffect } from "react";

export const VidStim = ( { videoListProp, videoStateProp, advanceVideoProp, videoDurationsProp } ) => {
    const [showStim, setShowStim] = useState(true);
    const [stimDisplay, setStimDisplay] = useState(5000)

    return (
        <>
            {showStim && 
                <>
                    <p>video:</p>
                    <video src={`/Users/f004p74/Documents/dartmouth/projects/fSEND/task/f-send/src/stimuli/${videoListProp[videoStateProp]}.mp4`} width="640" height="360" autoPlay>Unable to load video.</video>
                    <button onClick={advanceVideoProp}>next</button>
                </>
            }

            {showStim === false && 
                <>
                    <p>The next video will begin shortly.</p>
                </>
            }
        </>
    )
}