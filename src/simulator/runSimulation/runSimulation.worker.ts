// Utilizes workerize-loader found on https://github.com/developit/workerize-loader

import runEDQueueSimple from "./EDQueueSimple.worker"


export function simulate<T>(inputs: any) {
  return runEDQueueSimple(inputs)
}
