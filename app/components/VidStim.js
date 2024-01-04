import React, { useState, useEffect } from "react";

export const VidStim = ( { videoListProp, videoStateProp, advanceVideoProp, videoDurationsProp, ITIprop } ) => {
    const [showStim, setShowStim] = useState(true);
    const [stimDisplay, setStimDisplay] = useState(videoDurationsProp)

    var w = window.innerWidth;
    var h = window.innerHeight;

    /* when this component mounts, the state stimDisplay is first set to the length 
    of the clip, in miliseconds, and showStim is set to true. After the clips' duration
    has passed, the stimDisplay is switched to the ITI duration, which is calculated
     */

    useEffect(() => {
        if (showStim) {

            const timer = setTimeout(() => {
                setShowStim(false);
                setStimDisplay(ITIprop)
                advanceVideoProp();
            }, stimDisplay); 
            
            return () => clearTimeout(timer);

        } else {

            const timer = setTimeout(() => {
                setShowStim(true);
                setStimDisplay(videoDurationsProp)
            }, stimDisplay); 
            
            return () => clearTimeout(timer);         
        }
      }, [showStim]);


    console.log('videoList length:',videoListProp.length, 'videoID:', videoListProp[videoStateProp], 'videoState (videoList index):',videoStateProp,
    "video duration:", videoDurationsProp, "ITI length:", ITIprop)

    return (
        <div id="video-align">
            {showStim && 
                <>
                    <video src={`/stimuli/${videoListProp[videoStateProp]}.mp4`} width={w-5} height={h-5} autoPlay>Unable to load video.</video>
                </>
            }

            {showStim === false && 
                <>
                    <div id='experiment-text'>
                    <p>The next video [{videoStateProp+1} of {videoListProp.length}] will begin shortly.
                    </p>
                    </div>
                </>
            }
        </div>
    )
}