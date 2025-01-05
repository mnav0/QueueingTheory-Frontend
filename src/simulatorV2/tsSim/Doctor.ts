import { Patient } from "./Patient" 
import { ED } from "./ED"
import { PriorityQueue } from "./queues/PriorityQueue";
import { randomUniform } from "d3-random";

export class Doctor {
  static ID: number = 0;
  ED: ED;
  erack: PriorityQueue;
  pickup_rate: number;
  eval_rate: number;
  IDnum: number;
  NewPts: PriorityQueue;
  ActivePts: Array<Patient>;
  DispoPts: Array<Patient>;
  currentPt?: Patient;
  lastActionTimer: number;

  constructor(_ED: ED, pickup_rate: number, eval_rate: number, maxPts: number) {
    this.ED = _ED;
    this.erack = _ED.erack;
    this.pickup_rate = pickup_rate;
    this.eval_rate = eval_rate;
    this.IDnum = Doctor.ID;
    Doctor.ID += 1;
    this.NewPts = new PriorityQueue(1);
    this.ActivePts = [];
    this.DispoPts = [];
    this.currentPt = undefined;
    this.lastActionTimer = 0;
    //console.log("Doctor ", this.IDnum, " created.")
  }

  get_time() {
    return this.ED.get_time();
  }

  get_ID() {
    return this.IDnum
  }

  get_patient_totals() {
    return this.ActivePts.length + this.DispoPts.length + this.NewPts.length
  }

  get_patient_from_rack() {

    ///if there is a patient to get from rack, get them and add to NewPts
    if (!this.erack.empty()) {
      if ((this.ED.chance || randomUniform(0, 1)) <= this.pickup_rate) {
        const newpatient = this.erack.get();
        this.NewPts.put(newpatient);
        //console.log("Doctor ", this.IDnum, ": Signed up for Patient ", newpatient.get_ID(), "at", this.get_time());
        newpatient.set_doc(this);
        return newpatient;
      }
    }
    return undefined;
  }

  get_patient_from_new() {
    /// returns patient from newPts queue, none if empty
    if (this.NewPts.empty()) {
      return undefined;
    } else {
      const newpt = this.NewPts.get()
      this.ActivePts.push(newpt);
      return newpt;
    }
  }

  active_patient_need() {
    /// if there is an active patient with stuff to do, return them, else none
    for (var i = 0; i < this.ActivePts.length; i++) {
      const pt = this.ActivePts[i]
      if (pt.get_state() !== "evaluated") {
        /// evaluated == already evaled, NTD for MD
        return pt;
      }
    }
    return undefined;
  }

  get_active_patients() {
    return this.ActivePts;
  }

  get_next_patient_action() {
    /*
    get the next patient task and set as the current patient if so
        1. Any active patients need next step?
        2. If NTD, get a new patient
        3. else pass
    */

    if (this.currentPt !== undefined) {
      // sanity check
      return
    }

    this.currentPt = this.active_patient_need() //if next patient is an existing pt, select them
    if (this.currentPt === undefined) {
      if (!this.NewPts.full()) {
        this.get_patient_from_rack() // claim a patient from the erack, only an issue if allowing batches
      } else {
        this.currentPt = this.get_patient_from_new()
      }
    }
  }

  eval_treat_patient() {
    /// update status of current patient - see pt, eval pt, dispo pt...
    // states = unassigned, assigned, evaluated, treated, dispositioned
    if (this.currentPt === undefined) {
      return
    }
    const to_do = this.currentPt!.get_state()
    if (to_do === "assigned") {
      // initial eval
      if (this.lastActionTimer < this.eval_rate) {
        if (this.lastActionTimer === 0) {
          //console.log("Doctor" , this.IDnum, ": Evaluating patient", this.currentPt?.get_ID(), "at", this.get_time());
        }
        this.lastActionTimer += 1;
        return
      } else if (this.lastActionTimer >= this.eval_rate) {
        //console.log("Doctor", this.IDnum, ": Finished evaluating patient", this.currentPt?.get_ID(), "at", this.get_time());
        this.currentPt!.MDupdate()
        this.currentPt = undefined;
        this.lastActionTimer = 0;
      }
    } else if (to_do === "treated") {
      //dispo pt
      //console.log("Doctor", this.IDnum, ": dispositiong patient", this.currentPt?.get_ID(), "at", this.get_time());
      this.currentPt.MDupdate()
      this.ActivePts = this.ActivePts.filter((pt) => {
        return this.currentPt?.ID !== pt.ID;
      });
      this.DispoPts.push(this.currentPt)
      this.currentPt = undefined;
    } else {
      this.currentPt.MDupdate();
      this.currentPt = undefined;
    }
  }
  static currPatientUndefined = 0
  update() {
    /*
    General behavior - if not currently working on a patient:
        1. Check if anyone in the active list can be dispositioned
        2. Check if there is a new patient to see
        3. Otherwise, pass
    */
    // console.log("Doctor", this.IDnum, ": Active Patients: ")
    // for (var i = 0; i < this.ActivePts.length; i++) {
    //   console.log(this.ActivePts[i].get_ID(), " ");
    // }
    //console.log("\n");
    if (this.currentPt === undefined) { //not actively working on a patient -- use not None as == is overloaded for comp
      Doctor.currPatientUndefined += 1
      this.lastActionTimer = 0; //reset
      // Next line was changed bc python made no sense 
      this.get_next_patient_action();
      
    } else {
      this.eval_treat_patient();
    }
    return;
  }
}