import React, { useState, useEffect } from "react";
import { VidStim } from "./VidStim";

export const Experiment = ( {pageEvent, subID, runID} ) => { 

    const [trialSequence, setTrialSequence] = useState(0);

    useEffect(() => {
        import(`/Users/f004p74/Documents/dartmouth/projects/fSEND/task/f-send/public/sub_files/sub_00${subID}.json`)
          .then((module) => {
            // Access the JSON data from the imported module
            const data = module.default;
            setTrialSequence(data);
          })
          .catch((error) => {
            console.error('Error loading JSON file:', error);
          });
      }, [subID]);

    const [screenState, setScreenState] = useState(0);
    const [runState, setRunState] = useState(runID);
    const [videoState, setVideoState] = useState(0);

    const currentScreen = ['startScreen','opScreen','scanScreen','videoStimulus', 'ITI'];
    const videoList = [];
    const videoDurations = [];

    for (let video in trialSequence[runState]) {
        videoList.push(video);
        videoDurations.push(trialSequence[runState][video]);
    }

    // CALCULATE ITI FOR EACH 10MIN RUN (600000 MS)
    // 1) Get the sum of all 4 clip durations
    let sum = videoDurations.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
    
      // 2) Determine how many 6s gaps we need and add it to the sum
    const vidNum = videoList.length
    sum += vidNum * 6;
    
    // 3) subtract the new sum from 10minutes to get ITI of each trial
    const ITI = Math.floor((600000 - sum) / vidNum);

    const advanceRun = () => {
        if (runState < 10){
            setRunState((prev) => prev + 1);
            setVideoState(0);
            setScreenState((prev) => prev+1);
        } else if (runState === 10){
            pageEvent();
        }
    }

    // ADVANCING TO THE NEXT VIDEO
    const advanceVideo = () => {
        if (videoState < videoList.length-1) {
            setVideoState((prev) => prev+1);
        } else if (videoState === videoList.length-1) {
            advanceRun();
        }
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentScreen[screenState] === "ITI") {
                setScreenState(0);
            }
        }, ITI); // after ITI time 

        return () => {
            clearTimeout(timer);
        };
    }, [screenState]);  

    // ADVANCING READY SCREENS
    const detectKey = (e) => {
        if (e.key === '1') {
            setScreenState((prev) => prev+1);
        } else if (e.key === 'o') {
            setScreenState((prev) => prev+1);
        } else if (e.key === 's') {
            setScreenState((prev) => prev+1);
        }
    }

    // KEYDOWN LISTENER
    useEffect(() => {
        document.addEventListener('keydown',detectKey,true)
    }, [])
    
    // TROUBLESHOOTING
    console.log("runstate:", runState, "subjectID:", subID, "runID:", runID)
    
    return (
    <div>
        {currentScreen[screenState] === "startScreen" && 
        <>
            <div id='experiment-text'>
                <p>Please press the button when you are ready to begin the next run</p>
                <p>[run {runState} of 10]</p>
                <button>Ready</button>
            </div>
        </>
        }
        
        {currentScreen[screenState] === "opScreen" && 
        <>
            <div id='experiment-text'>
                <p>Waiting for operator confirmation ...</p>
            </div>
        </>
        }

        {currentScreen[screenState] === "scanScreen" && 
        <>
            <div id='experiment-text'>
                <p> Waiting for scanner ... </p>
            </div>
        </>
        }

        {currentScreen[screenState] === "videoStimulus" && 
        <>
        <VidStim videoListProp={videoList} videoStateProp={videoState} advanceVideoProp={advanceVideo} videoDurationsProp={videoDurations[videoState]} ITIprop={ITI}/>
        </>
        }

        {currentScreen[screenState] === "ITI" && 
        <>
            <div id='experiment-text'>
                <p>Run complete...preparing next run...</p>
            </div>
        </>
        }

    </div>
    );
};