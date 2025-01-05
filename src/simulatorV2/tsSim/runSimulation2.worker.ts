import runEDQueueSimple from "./EDQueue2.worker"


export function simulate<T>(inputs: any) {
  return runEDQueueSimple(inputs)
}