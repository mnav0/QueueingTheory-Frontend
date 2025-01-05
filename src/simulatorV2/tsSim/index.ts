import createSimWorker from "workerize-loader!./runSimulation.worker"; // eslint-disable-line import/no-webpack-loader-syntax
import * as Simulation from "./runSimulation2.worker";
import { ED } from "./ED";


export const simInstance = createSimWorker<typeof Simulation>();

export default runSimulator;
export function runSimulator(inputs: any): Promise<ED> {
  return simInstance.simulate(inputs);
}
