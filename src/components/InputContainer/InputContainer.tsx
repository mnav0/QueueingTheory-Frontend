import React from 'react'
import { InputField } from "src/components/InputField"
import { InputOptions } from "src/components/InputOptions"
import { InputButtons } from "src/components/InputButtons"

export interface InputFieldProps {
  fieldTitle: string;
  fieldID: string;
}

const inputsData: InputFieldProps[] = [
  {
    fieldTitle: "Workup Rate",
    fieldID: "workupTime"
  },
  {
    fieldTitle: "Number of Physicians",
    fieldID: "provNumber"
  },
  {
    fieldTitle: "Patients Per Hour",
    fieldID: "patientSpeed"
  }
]

export const InputContainer: React.FC = () => {

  return (
    <div className="container">
      {inputsData.map((value, index) => {
        return(<InputField fieldTitle={value.fieldTitle} fieldID={value.fieldID} key={index} />)
      })}
      <InputOptions />
      <InputButtons />
    </div>
  )
}
export default InputContainer;
