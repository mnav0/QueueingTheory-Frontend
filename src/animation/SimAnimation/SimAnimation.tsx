import React, { useState, useEffect } from "react";

import "./styles.css"

import { useResults } from "src/state/index"

import { Doctor, Patient } from "src/simulator/runSimulation/EDQueueSimple.worker"

import ERRoom from "src/animation/ERRoom/ERRoom"
import ERQueue from "src/animation/ERQueue/ERQueue"
import Slider from "src/animation/Slider/Slider"
import InfoBox from "src/animation/InfoBox/InfoBox"

import { Stat, Event } from "src/animation/InfoBox/InfoBox"

export type SelectType = null | Doctor | Patient

export interface DisplayNode {
  data: SelectType,
  type?: string,
  status?: string,
  stats?: Stat[],
  events?: Event[]
}

export const SimAnimation: React.FC = () => {
  const results = useResults()
  const [time, setTime] = useState(0)
  const [selected, setDisplay] = useState<DisplayNode>({ data: null })

  const resetInfo = () => setDisplay({ data: null })

  useEffect(() => {
    setTime(0)
  }, [results])

  if (results.docs?.length === 0) {
    return (
      <div className="anim-alt text-center">
        Please run the simulation to access the animation!
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="anim-container flex items-center">
        <div className="animation mx-10">
          <ERRoom doctors={results.docs} time={time} setDisplay={setDisplay} />
          <ERQueue time={time} queuePatients={results.queuePatients} setDisplay={setDisplay} />
        </div>
        <div className="flex items-center info-box">
          <InfoBox selected={selected} time={time} resetInfo={resetInfo} />
        </div>
      </div>
      <Slider time={time} setTime={setTime} />
    </div>
  )
}

export default SimAnimation
