import { useState } from 'react'
import './App.css'
import MyForm from './components/Form';

interface FormInfo{
  // General Info
  name?:string,
  email?: string,
  phone?: string,
  // Education
  school?: string,
  degree?: string,
  degree_start?: string,
  degree_end?: string,
  // Employment
  company?: string,
  position?: string,
  responsibilities?: string,
}


function App() {
  const [state, setState] = useState<FormInfo>({name:"",email:"",phone:"", school:"", degree:"",
                                                degree_start:"", degree_end:"", company:"", 
                                                position: "", responsibilities: ""
  });
  const [step, setStep] = useState<number>(1);


  return (
    <>
    {console.log(state)}
    <MyForm step={step} setStep={setStep} state={state} setState={setState}></MyForm>
      
    </>
  )
}

export default App
