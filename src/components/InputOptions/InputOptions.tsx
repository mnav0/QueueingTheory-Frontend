import React from 'react'

import { useInputs, useSetInputField } from "src/state"

export const InputOptions: React.FC = () => {
  // TODO: Remake this component using .map
  const { probability } = useInputs()

  const setInputfield = useSetInputField()
  
  const probabilityModels = ["Bernoulli", "Uniform"]

  return (
    <div className="mx-auto">
      <div className="inline-flex mt-4">
        <label className="flex items-center my-1 mr-4">
          <input 
            type="radio" 
            className="form-radio" 
            name="radio" 
            value={probabilityModels[0]} 
            checked={probability === probabilityModels[0]}
            onChange={(event) => 
              setInputfield({"probability" : event.currentTarget.value})
          }
        />
          <span className="ml-2">Bernoulli</span>
        </label>
        <label className="flex items-center">
          <input 
            type="radio" 
            className="form-radio" 
            name="radio" 
            value={probabilityModels[1]} 
            checked={probability === probabilityModels[1]}
            onChange={(event) =>
              setInputfield({ "probability": event.currentTarget.value })
            }
        />
          <span className="ml-2">Uniform</span>
        </label>
      </div>
    </div>
  )
}

export default InputOptions;
