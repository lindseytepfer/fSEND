import React, { useState, useEffect } from "react";
import { VidStim } from "./VidStim";

export const Experiment = ( {pageEvent, subID, runID} ) => { 

    const [trialSequence, setTrialSequence] = useState(0);

    useEffect(() => {
        import(`/Users/f004p74/Documents/dartmouth/projects/fSEND/task/f-send/public/sub_files/sub_${subID}.json`)
          .then((module) => {
            // Access the JSON data from the imported module
            const data = module.default;
            setTrialSequence(data);
          })
          .catch((error) => {
            console.error('Error loading JSON file:', error);
          });
      }, [subID]);

    const [trigger, setTrigger] = useState([]);
    const [screenState, setScreenState] = useState(0);
    const [runState, setRunState] = useState(runID);
    const [videoState, setVideoState] = useState(0);
    const [interval, setInterval] = useState(0);

    const currentScreen = ['startScreen','opScreen','scanScreen','videoStimulus', 'ITI'];
    const videoList = [];
    const videoDurations = [];

    for (let video in trialSequence[runState]) {
        videoList.push(video);
        videoDurations.push(trialSequence[runState][video]);
    }

    // CALCULATE ITI FOR EACH RUN 
    useEffect(()=>{
        // for every video, we add one 6s ITI
        if (videoList.length > 1) {
            const totalDuration = videoDurations.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
              },0);

            setInterval(Math.floor((600000 - totalDuration) / 4));
        } else {
            setInterval(6000);
        }
    },[screenState])

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
        }, interval); // after ITI time 

        return () => {
            clearTimeout(timer);
        };
    }, [screenState]);  

    // ADVANCING READY SCREENS
    
    // KEYDOWN LISTENER
    useEffect(() => {
        document.addEventListener('keydown',detectKey,true)
    }, [])

    const detectKey = (e) => {
        if (e.key === '1') {
            setTrigger((trigger) => [...new Set([...trigger, e.key])]);
        } else if (e.key === 'o') {
            setTrigger((trigger) => [...new Set([...trigger, e.key])]);
        } else if (e.key === '5') {
            setTrigger((trigger) => [...new Set([...trigger, e.key])]);
        }
    }

    // SCREEN STATE LISTENER
    useEffect(()=> {
        if (trigger.toString() === "1"){
            setScreenState(1);
        } else if (trigger.toString() === "1,o"){
            setScreenState(2);
        } else if (trigger.toString() === "1,o,5"){
            setScreenState(3);
        }
    },[trigger])

    useEffect(()=> {
        if (screenState === 0 || screenState === 4){
            setTrigger([]);
            console.log(trigger)
        } 
    },[screenState])

    // TROUBLESHOOTING
    console.log("screenState:", screenState, currentScreen[screenState],
    "videoState:", videoState, videoList[videoState],
    "RunState:", runState,
    "trigger:", trigger)
    
    return (
    <div>
        {currentScreen[screenState] === "startScreen" && 
        <>
            <div id='experiment-text'>
                <p>Please press the button when you are ready to begin the next run</p>
                <p>[run {runState} of 10]</p>
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
        <VidStim videoListProp={videoList} videoStateProp={videoState} advanceVideoProp={advanceVideo} videoDurationsProp={videoDurations[videoState]} ITIprop={interval}/>
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