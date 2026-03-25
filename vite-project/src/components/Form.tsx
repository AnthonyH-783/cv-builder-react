
import type { Dispatch, SetStateAction } from "react";

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

    // Form Parsing Functions
    const parseData = (data: FormData): Record<string,string> => {
        const extracted: Record<string,string> = {};
        for(const pair of data.entries()){
            const name: string = pair[0];
            const value: string = pair[1] as string;
            extracted[name] = value;
        }
        return extracted;
    }
    // Saving form
    const saveForm = (form: HTMLFormElement): void => {
        const data = new FormData(form);
        const parsed_data: Record<string,string> = parseData(data);
        setState((prev) => ({...prev, ...parsed_data}));
    }
    // Event Handler for next button
    const goNext = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        if(!evt.target) return;
        const form = (evt.target as HTMLElement).closest("form");
        if(!form) return;
        saveForm(form);
        setStep(step + 1);
    }
    // Event Handler for Previous button
    const goPrev = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        if(!evt.target) return;
        const form = (evt.target as HTMLElement).closest("form");
        if(!form) return;
        saveForm(form);
        setStep(step - 1);
    }


    switch(step){
        case 1:
            // General Info
            return <form className="general-info">
                <h3>General Info</h3>
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" name="name" value={state.name}/>
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" name="email" value={state.email}/>
                </fieldset>

                <fieldset>
                    <legend>Phone</legend>
                    <input type="tel" name="phone" value={state.phone}/>
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
                        <input type="text" name="school"/>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Degree Title</legend>
                        <input type="text" name="degree"/>
                    </fieldset>

                    <div className="dates">
                        <fieldset>
                            <legend>Degree Start</legend>
                            <input name="degree_start" type="date"></input>
                        </fieldset>

                        <fieldset>
                            <legend>Degree End</legend>
                            <input name="degree_end" type="date"></input>
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