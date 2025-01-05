import React from "react"

import "./styles.css"

import DoctorAnim from "src/animation/Doctor/Doctor"
import { Doctor } from "src/simulator/runSimulation/EDQueueSimple.worker"

import { DisplayNode } from "src/animation/SimAnimation/SimAnimation"

interface ERRoomProps {
  doctors?: Doctor[]
  time: number
  setDisplay: React.Dispatch<React.SetStateAction<DisplayNode>>
}

export const ERRoom: React.FC<ERRoomProps> = ({ doctors, setDisplay, time }) => {
  return (
    <div className="hospital-cont">
      <div className="hospital">
        {doctors?.map((doc: any) => {
          return <div className="w-1/4 " key={doc.ID}><DoctorAnim doc={doc} time={time} setDisplay={setDisplay} /></div>
        })}
      </div>
      <div className="w-full border border-black" />
    </div>
  )
}

export default ERRoom
