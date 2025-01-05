import { CTSim } from "./CTSim"
import { PatientCT } from './PatientCT'
import { randomUniform } from "d3-random";

export class CT {

    static ID: number = 0;
    ID: number;
    ED: CTSim;
    CTRate: number;
    currentPatient?: PatientCT;
    
    constructor(_ED: CTSim, CT_Rate: number) {
      this.ED = _ED;
      this.CTRate = CT_Rate;
      this.ID = CT.ID;
      CT.ID += 1;

      this.currentPatient = undefined;
    
    }
    
    update_ct() {
      if (this.currentPatient === undefined) {
          this.currentPatient = this.ED.get_next_patient()
      } else {
          var probability = this.ED.chance || randomUniform(0,1);
          if (probability <= this.CTRate / 60) {
              this.ED.finish_patient(this.currentPatient)
              this.currentPatient = undefined
          }
      }
    }
  
}