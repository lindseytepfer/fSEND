import React, { useState, useEffect } from "react";
import { RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import Axios from "axios";

const definitions = {'bossy': 'a person who likes giving people orders and wants things their own way.',
'easygoing': 'a person who is relaxed, tolerant, and not prone to rigid rules or bouts of temper.',
'nosy': 'a person who is overly curious about other people\'s business.',
'conscientious': 'a person who does their work or duty thoroughly and responsibly.',
'rebellious': 'a person who resists authority, control, or convention and wants to have their own way.',
'humble': 'a person who is modest and does not boast.'}

export const TraitQuestions = ( { pageEvent, subID }) => {

  const [data, setData] = useState(0);

  useEffect(() => {
      import(`/Users/f004p74/Documents/dartmouth/projects/fSEND/survey/survey-app/client/src/trialOrders/sub_00${subID}.json`)
        .then((module) => {
          // Access the JSON data from the imported module
          const x = module.default;
          setData(x);
        })
        .catch((error) => {
          console.error('Error loading JSON file:', error);
        });
    }, [subID]);

  const traitList = [];
  const targetList = [];

  for (let trait in data) {
    traitList.push(trait)
    for (let target in data[trait]) {
      targetList.push(target)
    }
  }

  const [trial, setTrial] = useState(1);
  const [traitIndex, setTraitIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState(0);
  const [click, setClick] = useState(false);
  const [ST, setST] = useState(0); // (stimulus) start time
  const [RT, setRT] = useState(0); // reaction time

  const target = targetList[targetIndex];
  const trait = traitList[traitIndex];

  const sendData = () => {
    Axios.post('http://localhost:3001/',{
      subID:subID,
      trial:trial,
      target:target,
      trait:trait,
      response:response,
      RT:RT
    }).then(() => {
      console.log("values inserted.");
    });
  };

  const advProgress = () => {
    setProgress((prev) => prev+1); 
  }
    
  const advanceTrial = () => {
    if (progress < 34){
      sendData();
      setTargetIndex((prev) => prev+1);
      setProgress((prev)=>prev+1);
      setResponse(0)
    } else {
      sendData();
      setProgress(0);
      setTraitIndex((prev) => prev +1);
      setTargetIndex((prev) => prev +1);
      setResponse(0)
    }
  }

  useEffect(() => {
    if (traitIndex === 6){
      pageEvent();
      console.log("traitIndex:", traitIndex)
    }
  }, [traitIndex])

  const toggleClick = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  }

  const handleChange = (e) => {
    setResponse(e.target.value);
    toggleClick();
  };

  useEffect(()=>{
    if (progress > 0) {
      const timer = setTimeout(()=>{
        setTrial((prev) => prev+1);
        advanceTrial();
      }, 800)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [click])

  useEffect(()=>{
    setST(Date.now());
  }, [targetIndex])

  useEffect(()=>{
    setRT(Date.now() - ST);
  },[click])

  console.log("response",response, "progress:", progress,
   "traitIndex:", traitIndex, "trait:", trait, "targetIndex", targetIndex)

  return (
    <div className="App">
        <> {progress === 0 && 
          <div id="question">
            <p>In the following section, you'll rate the individuals based on the following trait: {traitList[traitIndex]}</p>
            <p><em>{traitList[traitIndex]}: {definitions[trait]} </em></p>
            <button onClick={advProgress}>Got it!</button>
          </div>
        }
        </>

        {progress !== 0 && 
        <>
          <p id='question'>How would you rate this person on the following trait?</p>
    
          <div id='photo'><img src={`/images/${targetList[targetIndex]}.png`} alt="face" /></div>
    
          <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 25}}>{traitList[traitIndex]}</span></FormLabel>
                  <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={response} onChange={handleChange} >
                      <FormLabel id="sidelabel" labelplacement="start">Not at all {traitList[traitIndex]} </FormLabel>
                      <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                      <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                      <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                      <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                      <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement='bottom'/>
                      <FormControlLabel value="6" control={<Radio />} label="6" labelPlacement='bottom'/>
                      <FormControlLabel value="7" control={<Radio />} label="7" labelPlacement='bottom'/>
                      <FormLabel id="sidelabel" labelplacement="end">Very {traitList[traitIndex]} </FormLabel>
                  </RadioGroup>
          </FormControl>

        </>
        }
    </div>
  )
}