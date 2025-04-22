import { useState } from "react";
import InputAreaBlock from "./InputAreaBlock";
import responseGeminiAndStateSetting from "../js/geminiAPI";
import DESCRIPTION from "../data/InputDescriptionInfo";
import PROMPTS from "../data/geminiPromptDescriptionInfo";

/*Section 1*/
export default function InputSection(props) {
  //state setters
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let [assessment, setAssessment] = useState(null);

  //state setters collection
  const stateSetters = {
    setValue: props.setAssessmentFunc,
    setError: setError,
    setLoading: setLoading,
  };

  // prompt
  let forAssessmentPrompt = PROMPTS.onSubmissionPrompt(props.scene);

  /*Form handling function*/
  const handleAssessment = (event) => {
    event.preventDefault();

    // Read the form data
    const form = event.currentTarget;
    const formData = new FormData(form);

    //convert to JS object for easy extraction
    const formJson = Object.fromEntries(formData.entries());


    //complete prompt with data submitted by user
    forAssessmentPrompt = PROMPTS.updatePromptwithInputData(forAssessmentPrompt, ['Persona', 'Context', 'Task', 'Output', 'Constraints'], formJson);
    // make request to Gemini and set the states
    responseGeminiAndStateSetting(forAssessmentPrompt, stateSetters)
  };

  return (
    <section>
      <form
        name='prompt-form'
        method='POST'
        onSubmit={handleAssessment}
        className='p-10 md:p-20'
      >
        <h2 className='text-xl md:text-3xl font-bold'>
          Working on your Pentagram prompt
        </h2>
        {DESCRIPTION.map((item, index) => (
          <InputAreaBlock
            key={index}
            id={index}
            fieldName={item.label}
            fieldText={item.text}
          />
        ))}
        <button
          type='submit'
          className='p-4 border rounded-2xl bg-black text-white duration-300 ease-in-out hover:bg-white hover:text-black hover:cursor-pointer'
        >
          Submit
        </button>
      </form>
    </section>
  );
}
