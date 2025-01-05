import { Doctor } from "./Doctor" 
import { Patient } from "./Patient"
import { Laboratory } from "./Laboratory" 
import { randomUniform } from "d3-random";
import { PriorityQueue } from "./queues/PriorityQueue";

export interface EDProps {
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

export class ED {

  erack: PriorityQueue;
  time: number;
  DoctorList: Array<Doctor>;
  DispoList: Array<Patient>;
  patient_rate: number;
  department_size: number;
  waiting_size: number;
  WR: PriorityQueue;
  num_docs: number;
  Laboratory: Laboratory;
  LWBSCount: number;
  chance?: number

  // RETURNS
  times: Array<number>;
  waitRoomVolume: Array<number>;
  departmentVolume: Array<number>;
  erackVolume: Array<number>;


  constructor(numDocs: number, patientRate: number, departmentSize: number, waitingSize: number, chance?: number) {
    //set ids to 0
    Laboratory.ID = 0;
    Patient.ID = 0;
    Doctor.ID = 0;
    this.erack = new PriorityQueue(-1)
    this.time = 0;
    this.DoctorList = [];
    this.DispoList = []
    this.patient_rate = patientRate;
    this.department_size = departmentSize;
    this.waiting_size = waitingSize;
    this.WR = new PriorityQueue(-1)
    this.num_docs = numDocs;

    for (var i = 0; i < this.num_docs; i++) {
      this.DoctorList.push(new Doctor(this, 0.75, 10, 8))
    }

    this.Laboratory = new Laboratory(this, 12)
    this.LWBSCount = 0;
    this.chance = chance

    this.times = [];
    this.waitRoomVolume = [];
    this.departmentVolume = [];
    this.erackVolume =[];

  }

  get_time() {
    return this.time;
  }

  dispoAdd(pt: Patient) {
    this.DispoList.push(pt);
  }

  dispoPop(pt: Patient) {
    this.DispoList = this.DispoList.filter((
      val) => {
        return val.ID !== pt.ID
      }
    );
  }

  get_volume() {
    var total = this.erack.length;
    for (var i = 0; i < this.DoctorList.length; i++) {
        total += this.DoctorList[i].get_patient_totals()
    }
    return total
  }

  get_total_volume() {
    return this.get_volume() + " / " + this.department_size;
  }
  
  get_total_WR() {
    return this.WR.length + " / " + this.waiting_size;
  }

  generate_patient_prob() {
    //generate a patient based on a poisson distribution, place it if there's room..."""
    var probability = this.chance || randomUniform(0,1);
    if (probability <= (this.patient_rate / 60)) {
      // a patient was generated
      if (this.get_volume() < this.department_size) {
        this.erack.put(new Patient(this, 3));
      } else if (this.WR.length < this.waiting_size) {
        this.WR.put(new Patient(this, 3));
      } else {
        const newpt = new Patient(this, 3)
        //console.log("Patient", newpt.get_ID(), "left without being seen!")
        this.LWBSCount += 1
      }
    }
  }

  update_WR_erack() {
    /// check if patients can be brought from WR to the erack
    if (this.get_volume() < this.department_size) {
      if (!this.WR.empty()) {
        const newpt = this.WR.get();
        //console.log("erack update from WR", this.erack.length, "WR: ", this.WR.length)
        this.erack.put(newpt);
      }
    }
  }

  send_patient_labs(patient: Patient) {
    this.Laboratory.get_next_patient(patient);
  }


  update() {
    //console.log("Time: ", this.time, "  In waiting room: ", this.get_total_WR(), " In department: ", this.get_total_volume(), "to be seen: ", this.erack.length);
    this.collectMetrics()

    this.generate_patient_prob()
    this.Laboratory.update()
    for (var i = 0; i < this.DoctorList.length; i++) {
      this.DoctorList[i].update()
    }
    for (var i2 = 0; i2 < this.DispoList.length; i2++) {
      this.DispoList[i2].update()
    }
    this.update_WR_erack();
    this.time += 1;
    //console.log("\n");
  }

//addded by tjs
collectMetrics() {
  this.times.push(this.time);
  this.waitRoomVolume.push(this.WR.length);
  this.departmentVolume.push(this.get_volume());
  this.erackVolume.push(this.erack.length);
}


  run(duration: number = 200) {
    for (var i = 0; i < duration; i++) {
      this.update()
    }
    //console.log("\ntimes: ", this.times, "\nwr: ", this.waitRoomVolume, "\ndept: ", this.departmentVolume, "\nerack: ", this.erackVolume)
    return this;
  }
}


export function run(opts: EDProps) {
  return new ED(opts.numDocs, opts.patientRate, opts.departmentSize, opts.waitingSize, opts.chance).run();
}

export default run;
