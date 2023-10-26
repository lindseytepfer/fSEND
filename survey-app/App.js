import './App.css';
import { useState } from "react";
import { Start } from "./components/start";
import { Instructions } from "./components/instructions";
import { TraitQuestions } from "./components/traitQuestions";
import { Completion } from "./components/completion";

const App = () => {
    const [subID, setSubID] = useState(0)
    const [pageState, setPageState] = useState(0);
    const nextPage = () => setPageState((prev) => prev + 1);

    console.log("pageState:", pageState)

    return (
        <div className="App">
            {(() => {
                switch (pageState) {
                    case 0:
                        return <Start pageEvent={nextPage} setSubID={setSubID} />
                    case 1:
                        return <Instructions pageEvent={nextPage} />;
                    case 2:
                        return <TraitQuestions pageEvent={nextPage} subID={subID} />;
                    case 3:
                        return <Completion />
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default App;
