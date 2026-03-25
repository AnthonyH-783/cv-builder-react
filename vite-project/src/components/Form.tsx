
import type { Dispatch, SetStateAction } from "react";

type callback = (param: number) => void;

interface FormInfo{
  name?: string,
  email?: string,
  phone?: string,
}

interface Prop{
    step: number,
    setStep: callback,
    setState: Dispatch<SetStateAction<FormInfo>>,
}


export default function MyForm({step, setStep, setState}: Prop){


    const goNext = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        if(!evt.target) return;
        const form = (evt.target as HTMLElement).closest("form");
        if(!form) return;
        const data = new FormData(form);
        const [name, email, phone] = [(data.get("name") as string),
                                      (data.get("email") as string),
                                      (data.get("phone") as string)];
             
        
        console.log(name, typeof email, phone);
        setState((prev) => ({...prev, name, email, phone}));
        setStep(step + 1);
        alert(name);
    
    }


    switch(step){
        case 1:
            // General Info
            return <form className="general-info">
                <h3>General Info</h3>
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" name="email"/>
                </fieldset>

                <fieldset>
                    <legend>Phone</legend>
                    <input type="tel" name="phone"/>
                </fieldset>

                <button onClick={(e) => goNext(e)} type="submit">Next</button>


            </form>
        case 2:
            // Education
            return <form className="education">

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