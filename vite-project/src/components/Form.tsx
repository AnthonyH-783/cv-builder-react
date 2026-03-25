
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

type callback = (param: number) => void;

interface FormInfo{
  name?: string,
  email?: string,
  phone?: string,
  school?: string,
  degree?: string,
  degree_start?: string,
  degree_end?: string,

}

interface Prop{
    step: number,
    state: FormInfo,
    setStep: callback,
    setState: Dispatch<SetStateAction<FormInfo>>,
}


export default function MyForm({step, setStep, state, setState}: Prop){

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

            </form >
        case 4:
            // Final Resume
            return <div className="resume">

            </div>

    }




}