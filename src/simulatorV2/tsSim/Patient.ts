import { Doctor } from "./Doctor" 
import { ED } from "./ED"
import { randomUniform } from "d3-random";

export class Patient {

static ID: number = 0;
ED: ED;
ESI: number;
startTime: number;
ID: number;
state: string;
needs: Set<string>;
doc?: Doctor;
needs_admit: boolean;

d2doc_time: number;
wr_time: number;
doc2dec_time: number;
LOS: number;

constructor(_ED: ED, ESI: number) {
  this.ED = _ED;
  this.ESI = ESI;
  this.startTime = _ED.get_time();
  this.ID = Patient.ID;
  Patient.ID += 1;
  this.state = "unassigned";
  this.needs = new Set();
  this.doc = undefined;
  this.needs_admit = false;

  this.d2doc_time = 0;
  this.wr_time = 0;
  this.doc2dec_time = 0;
  this.LOS = 0;
  //console.log("Patient ", this.ID, ": I have arrived at time ", this.startTime)

  const ESIdict: { [id: number]: number[]; } = { 1: [0.9, 0.0, 0.8], 2: [0.8, 0.0, 0.6], 3: [0.75, 0.0, 0.4], 4: [0.5, 0.0, 0.2], 5: [0.3, 0.0, 0.1]};
  if ((this.ED.chance || randomUniform(0,1)) <= ESIdict[this.ESI][0]) {
    this.needs.add("labs");
  }
  if ((this.ED.chance || randomUniform(0, 1)) <= ESIdict[this.ESI][1]) {
    this.needs.add("rads");
  }
  if ((this.ED.chance || randomUniform(0, 1)) <= ESIdict[this.ESI][2]) {
    this.needs_admit = true;
  }

}

get_state() {
  return this.state;
}

get_ID() {
  return this.ID;
}

set_doc(newdoc: Doctor) {
  this.doc = newdoc
}

finish_labs() {
  if (this.needs.has("labs")) {
    this.needs.delete("labs");
  }
  this.MDupdate();
}

finish_rads() {
  if (this.needs.has("rads")) {
    this.needs.delete("rads")
  }
}

MDupdate() {

  if (this.state === "unassigned") {
    this.d2doc_time = this.ED.get_time() - this.startTime;
    this.state = "assigned"

  } else if (this.state === "assigned") {

    if (this.needs.size < 1) {
      this.state = "treated";
    } else {
      this.state = "evaluated";
      if (this.needs.has("labs")) {
        this.ED.send_patient_labs(this);
      }
    }

  } else if (this.state === "evaluated") {
    // hang out until needs are met
    if (this.needs.size === 0) {
      this.state = "treated";
    }

  } else if (this.state === "treated") {
    this.state = "dispositioned";
    this.doc2dec_time = this.ED.get_time() - this.d2doc_time;
    this.ED.dispoAdd(this)
  }

}

update() {
  /*
  if self.state == "dispositioned":
            self.LOS = self.ED.get_time() - self.startTime
            self.doc.DispoPts.remove(self)
            self.ED.dispoPop(self)*/
  console.log("Patient", this.ID, this.state, "at time", this.ED.get_time())

  if (this.state === "dispositioned") {
    this.LOS = this.ED.get_time() - this.startTime
    this.doc!.DispoPts = this.doc!.DispoPts.filter((patient) => {
      return patient.ID !== this.ID;
    })
    this.ED.dispoPop(this)
  }
}

  __lt__(other: Patient) {
    return this.ESI < other.ESI;
  }

  __eq__(other: Patient) {
    return this.ESI === other.ESI;
  }

  __gt__(other: Patient) {
    return this.ESI > other.ESI;
  }
}