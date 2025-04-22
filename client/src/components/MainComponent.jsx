import '../style/MainComponent.css';
import { useState, useEffect } from "react";
import InputSection from "./InputSection";
import ScenarioSection from "./ScenarioSection";
import ResultSection from "./ResultSection";
import PROMPTS from "../data/geminiPromptDescriptionInfo";
import responseGeminiAndStateSetting from "../js/geminiAPI";

export default function MainComponent(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let [scene, setScene] = useState(null);
    const [assessment, setAssessment] = useState(null);

    const stateSetters = {setValue:setScene, setError:setError, setLoading:setLoading};

    function setAssessmentFunc(value){
      setAssessment(value);
    }

    useEffect(()=>{
        //let initialPrompt = "who painted the Mona Lisa";//for testing purposes only
        const abouts = [null, 'software development plan', 'public health', 'pharmaceutical and drug development', 'logistics', 'urbanization of a sector of a city', 'community work', 'contingency plan against natural disasters', 'education program'];
        const indx =Math.floor(Math.random()*abouts.length);
        let initialPrompt = PROMPTS.onMountScenarioPrompt(abouts[indx]);
        responseGeminiAndStateSetting(initialPrompt, stateSetters);
      },
      []);

    return (
      <>
          {
            loading ?
            <main>
              <h1>loading...</h1>
            </main>
            :
            error ?
            <main>
              <h1>Something went wrong. Please try again later</h1>
            </main>
            :
            <main className="main">
              <ScenarioSection scene={scene}/>
              <InputSection scene={scene} setAssessmentFunc={setAssessmentFunc}/>
              <ResultSection assessment={assessment}/>
            </main>
          }
        </>
      );
}