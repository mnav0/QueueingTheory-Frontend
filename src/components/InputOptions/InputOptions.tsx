import React, {useEffect} from 'react'

import { useInputs, useSetInputField } from "src/state"

interface InputOptionsProps {
  pageType: string
}

export const InputOptions: React.FC<InputOptionsProps> = ({pageType}) => {
  const { probability, simType } = useInputs()
  const setInputfield = useSetInputField()

  // this is just here to test that the simType is updated based on the different page that you are currently on
  useEffect(() => {
    console.log({simType})
  }, [probability, simType])
  
  const probabilityModels = ["Bernoulli", "Uniform"]
  
  return (
    <div className="mx-auto">
      <div className="inline-flex mt-4">
       {probabilityModels.map((value, index) => (
         <label className="flex items-center my-1 mr-4">
          <input 
            type="radio" 
            className="form-radio" 
            name="radio" 
            value={probabilityModels[index]} 
            checked={probability === probabilityModels[index]}
            onChange={(event) => 
              setInputfield({"probability" : event.currentTarget.value, "simType": pageType})
          }
          />
         <span className="ml-2">{value}</span>
       </label>
       ))}
      </div>
    </div>
  )
}

export default InputOptions;
