
import type { ChangeEvent } from "react";
import { useState } from "react";
import Resume from "./Resume";
import type FormInfo from "../types";

export default function MyForm(){

    // Defining state hooks
      const [state, setState] = useState<FormInfo>({name:undefined,email:undefined,phone:undefined, school:undefined, degree:undefined,
                                                    degree_start:undefined, degree_end:undefined, company:undefined, 
                                                    position: undefined, responsibilities: undefined
      });
      const [step, setStep] = useState<number>(1);

    // Defining event handlers

    // Event Handler for next button
    const goNext = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setStep(step + 1);
    }
    // Event Handler for Previous button
    const goPrev = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setStep(step - 1);
    }
    // Event handler that saves input to state
    const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;

        setState((prev) => ({...prev, [name]: value}));
    }

    const handleTextArea = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;

        setState((prev) => ({...prev, [name]: value}));
    }

    switch(step){
        case 1:
            // General Info
            return <form className="general-info">
                <h3>General Info</h3>
                <fieldset>
                    <legend>Name</legend>
                    <input onChange={handleChange} type="text" name="name" value={state.name}/>
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input onChange={handleChange} type="email" name="email" value={state.email}/>
                </fieldset>

                <fieldset>
                    <legend>Phone</legend>
                    <input onChange={handleChange} type="tel" name="phone" value={state.phone}/>
                </fieldset>

                <button onClick={(e) => goNext(e)} type="submit">Next</button>

            </form>
        case 2:
            // Education
            return <form className="education">
                <h3>Education</h3>
                <div>
                    <fieldset>
                        <legend>School</legend>
                        <input onChange={handleChange} type="text" name="school" value={state.school}/>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Degree Title</legend>
                        <input onChange={handleChange} type="text" name="degree" value={state.degree}/>
                    </fieldset>

                    <div className="dates">
                        <fieldset>
                            <legend>Degree Start</legend>
                            <input onChange={handleChange} name="degree_start" type="date" value={state.degree_start}></input>
                        </fieldset>

                        <fieldset>
                            <legend>Degree End</legend>
                            <input onChange={handleChange} name="degree_end" type="date" value={state.degree_end}></input>
                        </fieldset>

                    </div>


                </div>
                <div className="buttons">
                    <button onClick={(e) => goPrev(e)} type="submit">Previous</button>
                    <button onClick={(e) => goNext(e)} type="submit">Next</button>
                </div>



            </form>
        case 3:
            // Work Experience
            return <form className="work">
               <h3>Work Experience</h3>
                    <div>
                        <fieldset>
                            <legend>Company Name</legend>
                            <input onChange={handleChange} type="text" name="company" value={state.company}/>
                        </fieldset>
                        
                        <fieldset>
                            <legend>Position</legend>
                            <input onChange={handleChange} type="text" name="position" value={state.position}/>
                        </fieldset>
                        <fieldset>
                            <legend>Responsibilities</legend>
                            <textarea onChange={handleTextArea} name="responsibilities" value={state.responsibilities}/>
                        </fieldset>

                        <div className="dates">
                            <fieldset>
                                <legend>Work Start</legend>
                                <input onChange={handleChange} name="work_start" type="date" value={state.work_start}></input>
                            </fieldset>

                            <fieldset>
                                <legend>Work End</legend>
                                <input onChange={handleChange} name="work_end" type="date" value={state.work_end}></input>
                            </fieldset>

                        </div>

                    </div>
                    <div className="buttons">
                        <button onClick={(e) => goPrev(e)} type="submit">Previous</button>
                        <button onClick={(e) => goNext(e)} type="submit">Next</button>
                    </div>

            </form >
        case 4:
            // Final Resume
            return <Resume formInfo={state} setStep={setStep}></Resume>

    }

}