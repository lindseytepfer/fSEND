import './App.css';
import React, { useState } from "react";
import { Start } from "./components/Start";
import { Instructions } from "./components/Instructions";
import { Experiment } from "./components/Experiment";
import { Completion } from "./components/Completion";

const App = () => {
    const [subID, setSubID] = useState(0)
    const [runID, setRunID] = useState("")
    const [pageState, setPageState] = useState(0);
    const nextPage = () => setPageState((prev) => prev + 1);

    console.log("pageState:", pageState, "runID:", runID)

    return (
        <div className="App">
            {(() => {
                switch (pageState) {
                  case 0:
                      return <Start pageEvent={nextPage} setSubID={setSubID} setRunID={setRunID} />
                    case 1:
                        return <Instructions pageEvent={nextPage} runID={runID} setRunID={setRunID}/>;
                    case 2:
                        return <Experiment pageEvent={nextPage} subID={subID} runID={runID} setRunID={setRunID}/>;                       
                    case 3:
                        return <Completion pageEvent={nextPage} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default App;
