import { Doctor } from "./Doctor" 
import { PatientCT } from "./PatientCT"
import { Laboratory } from "./Laboratory" 
import { randomUniform } from "d3-random";
import { PriorityQueue } from "./queues/PriorityQueue";
import { CT } from './CT'
import { InputNodeCT } from "src/state/useStateContext";

export interface CTSimProps {
  numDocs: number;
  patientRate: number;
  departmentSize: number;
  waitingSize: number;
  chance?: number;
}

export function BernoulliTrial(probability: number, chance?: number) {
  if (chance === undefined) {
    chance = randomUniform(0, 1)()
  }

  return (chance <= probability);
}

export class CTSim {

  time: number;
  num_CTs: number;
  CT_rate: number;
  CTList: Array<CT>;
  PTList: Array<PatientCT>;
  total_waiting_CT: number;
  total_pts_finished: number;
  patient_rate: number;
  chance?: number;

  times: Array<number>;
  waitRoomVolume: Array<number>;
  departmentVolume: Array<number>;

  constructor(numCTs: number, patientRate: number, CTRate: number, chance?: number) {
    PatientCT.ID = 0;
    CT.ID = 0;
    this.time = 0;
    this.num_CTs = numCTs;
    this.CT_rate = CTRate;
    this.CTList = [];
    this.PTList = [];
    this.total_waiting_CT = 0;
    this.total_pts_finished = 0;
    this.chance = chance

    // pts per hour
    this.patient_rate = patientRate;

    for (var i = 0; i < this.num_CTs; i++) {
      this.CTList.push(new CT(this, CTRate))
    }

    this.times = [];
    this.waitRoomVolume = [];
    this.departmentVolume = [];
  }

  get_time() {
    return this.time;
  }

  get_next_patient() {
    let newPt
    if (this.PTList.length > 0) {
        newPt = this.PTList.pop()
    }
    return newPt
  }

  generate_patient_prob() {
      var probability = this.chance || randomUniform(0,1);
      if (probability <= this.patient_rate / 60) {
        this.PTList.push(new PatientCT(this))
      }
  }

  finish_patient() {
      this.total_pts_finished += 1
  }

  get_avg_wait() {
      if (this.total_pts_finished > 0) {
          return Math.round(this.total_waiting_CT / this.total_pts_finished)
      } else {
          return 0
      }
  }

  get_utilization_ratio() {
      return Math.round(this.patient_rate / (this.num_CTs * this.CT_rate))
  }

  update() {
      this.collectMetrics()
      this.generate_patient_prob()

      this.PTList.forEach((pt) => {
          pt.update_pt()
          this.total_waiting_CT += 1
      })

      this.CTList.forEach((ct) => {
          ct.update_ct()
      })

      this.time += 1
  }

  // get stats
  collectMetrics() {
    this.times.push(this.time);
    this.waitRoomVolume.push(this.total_waiting_CT);
    // is this correct to return for dept volume?
    this.departmentVolume.push(this.CTList.length + this.PTList.length);
  }

  run(duration: number = 200) {
    for (var i = 0; i < duration; i++) {
      this.update()
    }
    //console.log("\ntimes: ", this.times, "\nwr: ", this.waitRoomVolume, "\ndept: ", this.departmentVolume, "\nerack: ", this.erackVolume)
    return this;
  }
}

export function run(opts: InputNodeCT) {
  return new CTSim(opts.numCTs, opts.patientRate, opts.CTRate, opts.chance).run();
}

export default run;
