import { Patient, Doctor } from "src/simulator/runSimulation/EDQueueSimple.worker";

// Function that checks if the number is between two numbers or after the starting number if there is no end
export function numBetween(numberToCheck: number, startNumber: number, endNumber?: number): boolean {
  if (startNumber !== undefined && endNumber !== undefined) {
    return (numberToCheck >= startNumber && numberToCheck <= endNumber);
  } if (startNumber !== undefined && endNumber === undefined) {
    return (numberToCheck >= startNumber)
  }
  return false
}


// Function checks if any of the doctor's patients are being seen by the doctor given the current time
export function currentPatient(time: number, patientList: Patient[]) {
  return patientList.filter(patient => {
    const { seenTime, endTime } = patient
    return numBetween(time, seenTime!, endTime!)
  })
}

export default currentPatient

// Function takes in the time and returns in army time + day count
export function timeInHours(time: number): number[] {
  const days = Math.floor(time / 24);
  const hours = time % 24;

  return [days, hours]
}

// Function takes in Patient/Doctor and returns relevant statistics
export function returnStats(selected: Patient | Doctor, time: number) {
  if (!selected) return

  if ("patient" in selected) {
    // TODO: Implement useful doctor stats once new simulation comes in
    return ([
      {
        desc: "Placeholder",
        result: "placeholder"
      }
    ])
  }

  if ("seenBy" in selected) {
    // BUG: The calc below sometimes will have "-1" as a result, know where the issue is but might be eliminated with new sim code anyway. 
    return ([
      {
        desc: "Total Wait Time",
        result:
          `${timeInHours(time - selected.startTime)[0]} day(s), ${timeInHours(time - selected.startTime)[1]} hour(s)`
      }
    ])
  }
}

// Function takes in Patient/Doctor and returns events that's transpired
export function returnEvents(selected: Patient | Doctor, time: number) {
  if (!selected) return

  if ("patient" in selected) {
    // TODO: Implement events for doctors
    return 
  }

  if ("seenBy" in selected) {
    // Basic stats used to demonstrate how the events will be created, will be updated with new sim code
    return ([
      {
        time: 110,
        title: "Check-in",
        desc: "Patient checks into hospital",
      },
      {
        time: 120,
        title: "Seen",
        desc: "Seen by doctor"
      },
      {
        time: 125,
        title: "Discharged",
        desc: "Discharged"
      }
    ])
  }
}

export function returnAllInfo(selected: Patient | Doctor, time: number) {
  if (!selected) return

  return { stats: returnStats(selected, time), events: returnEvents(selected, time) }
}
