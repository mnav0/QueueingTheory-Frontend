import { useState, useCallback } from "react";
import { Doctor, Patient } from "src/simulator/runSimulation/EDQueueSimple.worker";

export interface InputNode {
  workupTime: number;
  provNumber: number;
  patientSpeed: number;
  probability: string;
  chance?: number;
  simType: string;
  [key: string]: any;
}

export interface InputNode2 {
  numDocs: number;
  patientRate: number;
  departmentSize: number;
  waitingSize: number;
  chance?: number;
}

export interface InputNodeCT {
  numCTs: number;
  patientRate: number;
  CTRate: number;
  chance?: number;
}

export interface ResultNode {
  queueLengths: number[],
  waits: number[],
  times: number[],
  totals: number[],
  time: number,
  docs?: Doctor[],
  patients?: Patient[],
  queuePatients: Patient[][]
}

export function useStateContext() {
  const [inputs, setInputs] = useState<InputNode>({
    workupTime: 0,
    provNumber: 0,
    patientSpeed: 0,
    probability: "Bernoulli", 
    simType: "dept",
  });
  const setInputField = useCallback(
    (newInputs: Partial<InputNode>) => setInputs({ ...inputs, ...newInputs }),
    [inputs]
  );

  const [results, setResults] = useState<ResultNode>({
    queueLengths: [],
    waits: [],
    times: [],
    totals: [],
    time: 0,
    docs: [],
    patients: [],
    queuePatients: []
  })
  const setResultsField = useCallback(
    (newResults: ResultNode) => setResults(newResults),
    [results]
  );

  return { inputs, setInputField, setInputs, results, setResultsField };
}
