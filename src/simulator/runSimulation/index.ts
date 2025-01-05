import createSimWorker from "workerize-loader!./runSimulation.worker"; // eslint-disable-line import/no-webpack-loader-syntax
import * as Simulation from "./runSimulation.worker";
import { ED } from "./EDQueueSimple.worker";


export const simInstance = createSimWorker<typeof Simulation>();

export default runSimulator;
export function runSimulator(inputs: any):Promise<ED> {
  return simInstance.simulate(inputs);
}
