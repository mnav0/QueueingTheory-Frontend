import React, { useEffect } from 'react'

import { useResults, useInputs, useSetResultsField, useSetInputs, useSetInputField } from "src/state"
import * as R from 'ramda'
import { useQueryParams, NumberParam, StringParam } from "use-query-params"

import runSimulator from "src/simulator/runSimulation"
import { InputNode } from 'src/state/useStateContext'

import { isAnswered } from "src/utils/isAnswered"
import { exportData } from "src/utils/exportData"

const initInputState: InputNode = {
  workupTime: 0,
  provNumber: 0,
  patientSpeed: 0,
  probability: "Bernoulli"
}

export const InputButtons: React.FC = () => {
  const [query, setQuery] = useQueryParams({
    workupTime: NumberParam,
    provNumber: NumberParam,
    patientSpeed: NumberParam,
    probability: StringParam
  })
  const inputs = useInputs()
  const results = useResults()
  const setResultsField = useSetResultsField()
  const setInputField = useSetInputField()
  const setInputs = useSetInputs()

  useEffect(() => {
    const filteredQuery = R.filter((v => !R.isNil(v)), query) as Partial<InputNode>;
    setInputs((inputState: InputNode) => {
      return {
        ...inputState,
        ...filteredQuery
      }
    })
  }, [query]);

  async function startSimulation() {
    const sim = await runSimulator(inputs);
    const { time, queueLengths, times, waits, totals, docs, patients, queuePatients } = sim
    setResultsField({ time, queueLengths, times, waits, totals, docs, patients, queuePatients })
    setQuery(inputs)
    return
  }

  return (
    <div className="flex justify-center mt-10 flex-wrap">
      <button
        className={`btn w-1/4 m-3 text-sm ${(!isAnswered(inputs) ? "" : "disabled")}`}
        onClick={() => startSimulation()}
        disabled={!isAnswered(inputs)} >
          Run
      </button>
      <button 
        className={`btn w-1/4 m-3 text-sm ${(!isAnswered(inputs) ? "" : "disabled")}`}
        onClick={() => setInputField(initInputState)}
        disabled={!isAnswered(inputs)} >
          Clear
      </button>
      <button
        className={`btn w-1/4 m-3 text-sm ${(!isAnswered(inputs) ? "" : "disabled")}`}
        onClick={() => exportData(results)}
        // Not sure if this is the best way to do the disabled check but it's a guarenteed field within results
        disabled={results.docs?.length === 0} >
          Export
      </button>
    </div>
  )
}

export default InputButtons;
