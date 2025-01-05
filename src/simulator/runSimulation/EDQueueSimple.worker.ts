import { Deque } from "@blakeembrey/deque";
import { randomUniform } from "d3-random";
import { InputNode } from "src/state/useStateContext"

const sum = (array: number[]) =>
  array.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);

export function BernoulliTrial(probability: number, chance?: number) {
  if (chance === undefined) {
    chance = randomUniform(0, 1)()
  }

  return (chance <= probability);
}

export class ED {
  //CHANCE ADDED TO CONSTRUCTOR
  probability: string;
  provNumber: number;
  patientSpeed: number;
  workupTime: number;
  chance?: number;
  time: number; //simulation time
  patientTime: number; // minutes per new patient (uniform)
  queue: Deque<Patient>;
  docs: Doctor[];
  patients: Patient[];
  queueLengths: number[];  // size of waiting room
  waitTimes: number[]; // average wait time to be seen
  totalTimes: number[]; // total end to end time
  /////// STATS 
  times: number[];
  waits: number[];
  totals: number[];
  queuePatients: Patient[][];

  constructor(probability: string, provNumber: number, patientSpeed: number, workupTime: number, chance?: number) {
    Doctor.ID = 0;
    Patient.ID = 0;
    this.probability = probability;
    this.provNumber = provNumber;
    this.patientSpeed = (patientSpeed > 60) ? 60 : patientSpeed;
    this.workupTime = workupTime;
    this.chance = chance;
    this.time = 0;
    this.patientTime = 0;
    this.queue = new Deque<Patient>([]);
    this.docs = new Array<Doctor>();
    this.patients = new Array<Patient>();
    this.queueLengths = [];
    this.waitTimes = [];
    this.totalTimes = [];
    this.times = [];
    this.waits = [];
    this.totals = [];
    this.queuePatients = [];
  }

  update() {
    this.time += 1;
    //////////////UNIFORM\\\\\\\\\\\\\\\\
    if (this.probability === "Uniform") {
      //generate a patient hm?
      if (this.patientTime <= 0) {
        const newPatient = new Patient(this);
        //.append -> .push
        this.queue.push(newPatient);
        this.patients.push(newPatient);
        this.patientTime = Math.floor(60 / this.patientSpeed);
      } else {
        this.patientTime -= 1;
      }
    } else {
      if (BernoulliTrial(this.patientSpeed / 60, this.chance)) {
        const newPatient = new Patient(this);
        this.queue.push(newPatient);
        this.patients.push(newPatient);
      }
    }

    for (const doc of this.docs) {
      doc.update()
    };

    this.queueLengths.push(this.queue.size);
    this.times.push(this.time);

    const entries = Array.from(this.queue.entries())
    this.queuePatients.push(entries)

    if (this.waitTimes.length === 0) {
      this.waits.push(0)
    } else {
      this.waits.push(sum(this.waitTimes) / this.waitTimes.length);
    }

    if (this.totalTimes.length === 0) {
      this.totals.push(0);
    } else {
      this.totals.push((sum(this.totalTimes)) / this.totalTimes.length);
    }
  }

  aggregate() {
    return {
      time: this.time,
      times: this.times,
      waits: this.waits,
      totals: this.totals,
      queueLengths: this.queueLengths,
      queuePatients: this.queuePatients
    }
  }

  run(duration: number = 300) {
    this.time = 0;
    for (var i = 0; i < this.provNumber; i++) {
      this.docs.push(new Doctor(this));
    }

    while (this.time < duration) this.update();

    return this;
  }
}

export class Doctor {
  static ID: number = 0;
  ID: number;
  ED: ED;
  workupTime: number;
  workupDuration: number;
  patient?: Patient;
  patientList: Patient[];
  color: string;

  constructor(ED: ED) { // eslint-disable-line
    Doctor.ID += 1;
    this.ID = Doctor.ID;
    this.ED = ED;
    this.workupTime = this.ED.workupTime;
    this.workupDuration = 0; // This was causing the issue with tests - JW
    this.patient = undefined;
    this.patientList = [];
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  update() {
    if (this.patient === undefined) {
      if (this.ED.queue.size === 0) {
        return
      } else {
        this.patient = this.ED.queue.popLeft();
        this.patientList.push(this.patient)
        this.patient.seenBy = this.ID
        this.patient.update();
      }
    } else {
      this.workupDuration += 1;
      if (this.workupDuration >= this.workupTime) {
        this.patient!.update();
        this.patient = undefined;
        this.workupDuration = 0;
      }
    }
  }
}


export class Patient {
  static ID: number = 0
  ID: number;
  ED: ED;
  startTime: number;
  seenTime?: number;
  endTime?: number;
  seenBy?: number;
  color: string;

  constructor(ED: ED) { // eslint-disable-line
    Patient.ID += 1;
    this.ID = Patient.ID;
    this.ED = ED;
    this.startTime = this.ED.time;
    this.seenTime = undefined;
    this.endTime = undefined;
    this.seenBy = undefined;
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  update() {
    if (this.seenTime === undefined) {
      // picked up from rack
      this.seenTime = this.ED.time;
      // append --> push 
      this.ED.waitTimes.push(this.seenTime - this.startTime);
    } else {
      this.endTime = this.ED.time;
      this.ED.totalTimes.push(this.endTime - this.startTime);
    }
  }
}

export function run(opts: InputNode) {
  return new ED(opts.probability, opts.provNumber, opts.patientSpeed, opts.workupTime, opts.chance).run();
}

export default run;
