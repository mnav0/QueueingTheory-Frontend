import React from 'react'

import { useInputs, useSetInputField } from "src/state"
import { InputFieldProps } from "src/components/InputContainer/InputContainer"

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { fieldTitle, fieldID }: InputFieldProps = props

  const inputs = useInputs()
  const currentValue = inputs[fieldID]

  const setInputField = useSetInputField();

  return (
    <div>
      <label>{fieldTitle}</label>
      <input
        className="form-input form-input-dark pr-4 mt-1 block w-full"
        name={fieldID}
        type="number"
        value={currentValue}
        onChange={({ target: { value, name } }) =>
          setInputField({ [name]: value })
        }/>
    </div>
  )
}
export default InputField;
