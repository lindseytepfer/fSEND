import React, { useState, useEffect } from "react";
import { VidStim } from "./VidStim";

const trialSequence = {"1": {"ID145_vid4": 193320, "ID165_vid7": 103340, "ID153_vid3": 63000, "ID113_vid4": 180570},
              "2": {"ID161_vid1": 180720, "ID129_vid6": 157260, "ID111_vid3": 192060, "ID124_vid6": 96229},
              "3": {"ID112_vid1": 90520, "ID118_vid1": 164500, "ID127_vid3": 181380, "ID147_vid4": 120470},
              "4": {"ID169_vid2": 170240, "ID179_vid3": 163329, "ID171_vid5": 167170, "ID141_vid1": 60400},
              "5": {"ID174_vid2": 91539, "ID130_vid6": 112250, "ID156_vid3": 139770, "ID180_vid6": 147150},
              "6": {"ID181_vid6": 126170, "ID137_vid6": 163350, "ID164_vid3": 175740, "ID170_vid7": 69230},
              "7": {"ID128_vid5": 172970, "ID168_vid1": 121860, "ID123_vid3": 176300, "ID121_vid6": 87640},
              "8": {"ID117_vid4": 161450, "ID120_vid4": 142530, "ID131_vid2": 152920, "ID116_vid2": 115280},
              "9": {"physical-v1": 597470},
              "10": {"stutter-v1": 748500}}

export const Experiment = ( {pageEvent} ) => {
    const [screenState, setScreenState] = useState(0);
    const [runState, setRunState] = useState(1);
    const [videoState, setVideoState] = useState(0);

    const currentScreen = ['startScreen','opScreen','scanScreen','videoStimulus', 'ITI'];
    const videoList = [];
    const videoDurations = [];

    for (let video in trialSequence[runState]) {
        videoList.push(video);
        videoDurations.push(trialSequence[runState][video]);
    }

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
        }, 2000); // after X time 

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
    console.log("videoState",videoState, "videolist length", videoList.length, "runstate:", runState, videoList)
    
    return (
    <>
        {currentScreen[screenState] === "startScreen" && 
        <>
        <p>Please press the button when you are ready to begin the next run. </p>
        <button>Ready</button>
        </>
        }
        
        {currentScreen[screenState] === "opScreen" && 
        <>
        <p>The run will begin shortly ...</p>
        </>
        }

        {currentScreen[screenState] === "scanScreen" && 
        <>
        <p> Waiting for scanner ... </p>
        </>
        }

        {currentScreen[screenState] === "videoStimulus" && 
        <>
        <VidStim videoListProp={videoList} videoStateProp={videoState} advanceVideoProp={advanceVideo} videoDurationsProp={videoDurations[videoState]}/>
        </>
        }

        {currentScreen[screenState] === "ITI" && 
        <>
        <p>Run complete...preparing next run...</p>
        </>
        }

    </>
    );
};