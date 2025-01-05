import { ED } from "./ED" 
import { Patient } from "./Patient"
import { PriorityQueue } from "./queues/PriorityQueue";
import { randomUniform } from "d3-random";

export class Laboratory {
  static ID = 0
  ED: ED;
  erack: PriorityQueue;
  lab_rate: number;
  IDnum: number;
  ActivePts: Array<Patient>;

  constructor(ED: ED, lab_rate: number) {
    this.ED = ED;
    this.erack = ED.erack;
    this.lab_rate = lab_rate;
    this.IDnum = Laboratory.ID
    Laboratory.ID += 1
    this.ActivePts = [];
    //console.log("Laboratory ", this.IDnum, " created.")

  }

  get_time() {
    return this.ED.get_time()
  }

  get_ID() {
    return this.IDnum;
  }

  get_patient_totals() {
    return this.ActivePts.length
  }

  get_next_patient(patient: Patient) {
    /// adds a patient to the lab buffer
    this.ActivePts.push(patient)
    //console.log("Sending labs for Patient", patient.get_ID(), "at", this.ED.get_time());
  }

  finish_patient_labs(patient: Patient) {
    patient.finish_labs()
    this.ActivePts = this.ActivePts.filter((pt) => {
      return patient.ID !== pt.ID;
    });
    //console.log("Laboratory", this.IDnum, "finished labs for Patient", patient.get_ID(), "at", this.ED.get_time());
  }

  update() {
    /// check if patients need labs, if so, add to queue. if labs finish for a patient, set them to done and
    /// take them out of the queue
    //console.log("Lab", this.IDnum, ": Active Patients: ");
    for (var i = 0; i < this.ActivePts.length; i++) {
      //console.log(this.ActivePts[i].get_ID(), " ")
    }
    //console.log("\n")
    for (var i2 = 0; i < this.ActivePts.length; i2++) {
      const probability = this.ED.chance || randomUniform(0, 1);
      if (probability <= (1 / (this.lab_rate / 60))) {
        this.finish_patient_labs(this.ActivePts[i2])
      }
    }
    return
  }


}