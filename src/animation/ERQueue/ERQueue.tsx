import React from "react";
import "./styles.css";

import { Patient } from "src/simulator/runSimulation/EDQueueSimple.worker"
import { DisplayNode } from "src/animation/SimAnimation/SimAnimation"

import { returnStats } from "src/animation/simHelperFuncs"

import { FaUserInjured, FaChair } from "react-icons/fa";

interface ERQueueProps {
  queuePatients?: Patient[][],
  time: number,
  setDisplay: React.Dispatch<React.SetStateAction<DisplayNode>>
}

export const ERQueue: React.FC<ERQueueProps> = ({ time, queuePatients, setDisplay }) => {
  if (!queuePatients) return null

  const currentPatientQueue = queuePatients[time]
  if (!currentPatientQueue) return null

  const maxQueueLength = 24
  let overFlowCount = 0 // Number of patients over max queue length
  let vacantCount = 0 // Number of empty seats in queue
  
  if (currentPatientQueue.length >= maxQueueLength) {
    // Added + 1 to account for the removal of the last patient in the queue to display the overFlowCount
    overFlowCount = currentPatientQueue.length - maxQueueLength + 1 
  }

  if (currentPatientQueue.length <= maxQueueLength) {
    vacantCount = maxQueueLength - currentPatientQueue.length
  }
  
  const vacantArr = Array(vacantCount).fill(0)

  return (
    <div className="queue-cont">
      <div className="queue">
        {currentPatientQueue.map((val, idx) => {
          const patientColor = val.color

          if (idx === maxQueueLength - 1) return (
            <div className="counter w-1/12 my-2" key="counter">
              <span>+{overFlowCount}</span>
            </div>
          )

          if (idx > (maxQueueLength - 1)) return null

          return (
            <div
              className="qdpatient w-1/12 my-2"
              key={idx}
              onClick={() => setDisplay({ 
                data: val, 
                type: "patient", 
                status: "Waiting", 
                stats: returnStats(val, time)
              })} >
              < FaUserInjured className="h-8 w-8 cursor-pointer" color={patientColor} />
            </div>
          )
        })}
        {vacantArr.map((val, idx) => {
          return (
            <div
              className="qdpatient w-1/12 my-2" // Added qdpatient as className for sake of styling, can change later
              key={idx} >
              < FaChair className="h-8 w-8" />
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default ERQueue
