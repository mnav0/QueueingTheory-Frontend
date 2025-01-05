import React from "react";
import './styles.css'

import { Doctor } from "src/simulator/runSimulation/EDQueueSimple.worker"
import { DisplayNode } from "src/animation/SimAnimation/SimAnimation"

import { FaUserMd, FaUserInjured } from "react-icons/fa";

import currentPatient, { returnStats, returnEvents } from "src/animation/simHelperFuncs"

interface DoctorAnimProps {
  doc: Doctor;
  time: number;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayNode>>;
}

export const DoctorAnim: React.FC<DoctorAnimProps> = ({ doc, time, setDisplay }) => {
  const patList = doc.patientList
  const currentPat = currentPatient(time, patList)[0]
  const patientColor = (currentPat) ? currentPat.color : undefined
  const doctorColor = doc.color
  const doctorStatus = (currentPat) ? `Seeing Patient ${currentPat.ID}` : "Waiting for patient"

  return (
    <div className="room">
      <div
        className="doctor"
        onClick={() => setDisplay({ 
          data: doc, 
          type: "doctor", 
          status: doctorStatus, 
          stats: returnStats(doc, time),
          events: returnEvents(doc, time) 
        })} >
            <span className="text-center">{doc.ID}</span>
            < FaUserMd className="h-8 w-8 cursor-pointer" color={doctorColor} />
      </div>
      {!currentPat ? null : (
        <div key={currentPat.ID}>
          <div
            className="patient "
            onClick={() => setDisplay({
              data: currentPat,
              type: "patient",
              status: `Being seen by Doctor ${doc.ID}`,
              stats: returnStats(currentPat, time),
              events: returnEvents(currentPat, time)
            })}>
              <span className="text-center">{currentPat.ID}</span>
              < FaUserInjured className="h-8 w-8 cursor-pointer" color={patientColor} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorAnim;
