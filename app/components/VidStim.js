import React, { useState, useEffect } from "react";

export const VidStim = ( { videoListProp, videoStateProp, advanceVideoProp, videoDurationsProp, ITIprop } ) => {
    const [showStim, setShowStim] = useState(true);
    const [stimDisplay, setStimDisplay] = useState(videoDurationsProp)

    var w = window.innerWidth;
    var h = window.innerHeight;

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


    console.log('videoID:', videoListProp[videoStateProp], 'videoState (videoList index):',videoStateProp)

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
                    <p>The next video will begin shortly.</p>
                    </div>
                </>
            }
        </div>
    )
}