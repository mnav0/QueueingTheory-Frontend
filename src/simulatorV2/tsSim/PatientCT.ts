import { CTSim } from "./CTSim"

export class PatientCT {

    static ID: number = 0;
    ID: number;
    ED: CTSim;
    startTime: number;
    waitingTime: number;
    
    constructor(_ED: CTSim) {
      this.ED = _ED;
      this.startTime = _ED.get_time();
      this.ID = PatientCT.ID;
      PatientCT.ID += 1;

      this.waitingTime = 0;
      //console.log("Patient ", this.ID, ": I have arrived at time ", this.startTime)
    
    }
    
    get_waiting() {
      return this.waitingTime;
    }
    
    update_pt() {
      this.waitingTime += 1;
    }
  
}