import constate from "constate";

import { useStateContext } from "./useStateContext";

export const [
  StateProvider, 
  useInputs, 
  useSetInputField, 
  useResults, 
  useSetResultsField,
  useSetInputs
] = constate(
  useStateContext,
  value => value.inputs,
  value => value.setInputField,
  value => value.results,
  value => value.setResultsField,
  value => value.setInputs
);
