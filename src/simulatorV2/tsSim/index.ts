import createSimWorker from "workerize-loader!./runSimulation.worker"; // eslint-disable-line import/no-webpack-loader-syntax
import { ED } from "./ED";


export const simInstance = createSimWorker<any>();

export default runSimulator;
export function runSimulator(inputs: any): Promise<ED> {
  return simInstance.simulate(inputs);
}
