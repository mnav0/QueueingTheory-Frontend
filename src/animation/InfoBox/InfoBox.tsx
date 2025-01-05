import React from "react"

import { DisplayNode } from "src/animation/SimAnimation/SimAnimation"
import { useResults } from "src/state/index"

import { timeInHours } from "src/animation/simHelperFuncs"

import { FaUserMd, FaUserInjured, FaHospitalAlt } from "react-icons/fa";

import "./styles.css"

interface HeaderProps {
  type: string | undefined,
  name: string,
  status?: string,
  color?: string,
  resetInfo?: () => void
}


export const InfoHeader: React.FC<HeaderProps> = ({ type, name, status, color, resetInfo = () => { } }) => {
  const iconClass = "h-12 w-12 border-black border rounded-full bg-white p-1"
  const iconProps = { className: iconClass, color }

  return (
    <div className="display-header flex items-center relative">
      {type !== "ed" ? ( <button
          className="absolute top-0 right-0"
          onClick={resetInfo}><FaHospitalAlt className="h-4 w-4" />
        </button>
      ) : null}
      <div className="mr-6 ml-2" >
        {type === "patient" ? (
          <FaUserInjured {...iconProps} />
        ) : type === "doctor" ? (
          <FaUserMd {...iconProps} />
        ) : (
              <FaHospitalAlt {...iconProps} />
            )}
      </div>
      <div className="flex flex-col">
        <div className="text-xl header-name">
          {name}
        </div>
        <div className="text-lg text-gray-600">
          {status}
        </div>
      </div>
    </div>
  )
}

export interface Stat {
  desc: string,
  result: string | number,
}

export const StatsBox: React.FC<{ stats: Stat[], time: number }> = ({ stats, time }) => {
  return (
    <div className="stats-box-cont my-4">
      {stats.map((val, idx) => {
        return (
          <div key={idx} className="stats-ele my-2">
            {val.desc}: {val.result}
          </div>
        )
      })}
    </div>
  )
}

export interface Event {
  time: number,
  title: string,
  desc: string
}

export const Timeline: React.FC<{ events: Event[] }> = ({ events }) => {
  if (!events) return null
  
  return (
    <div>
      {events.map((evt, idx) => {
        // Not sure where to fit in title
        const { time, title, desc } = evt

        const [days, hours] = timeInHours(time)

        return (
          <div className="flex items-center mb-2" key={title}>
            <div className="w-1/5 flex flex-col">
              <span>{hours}:00</span>
              <span className="text-xs">Day: {days}</span>
            </div>
            <span>|</span>
            <span className="ml-2">{desc}</span>
          </div>
        )
      })}
    </div>
  )
}

export const EDInformation: React.FC<{ time: number }> = ({ time }) => {
  const results = useResults()

  const edStats = [
    {
      desc: "Mean Wait",
      result: (Math.round((results.waits[time] + Number.EPSILON) * 100) / 100) || 0
    },
    {
      desc: "Total Time",
      result: (Math.round((results.totals[time] + Number.EPSILON) * 100) / 100) || 0
    },
    {
      desc: "Queue Length",
      result: (results.queueLengths[time] || 0)
    }
  ]

  return (
    <div className="display-board flex flex-col">
      {/* TEMP: I wanted to make status optional and not pass anything but it messes up the styling a little */}
      <InfoHeader type="ed" name="ED" status="Some status" />
      <StatsBox stats={edStats} time={time} />
      <div className="text-center my-8">
        Click on a patient/doctor to view more info!
      </div>
    </div>
  )
}

interface DisplayProps {
  selected: DisplayNode,
  time: number,
  resetInfo: () => void
}

export const InfoBox: React.FC<DisplayProps> = ({ selected, time, resetInfo }) => {
  const { data, type, status, stats, events } = selected

  if (!selected.data || !stats) {
    return <EDInformation time={time} />
  }

  return (
    <div className="display-board flex flex-col">
      <InfoHeader
        type={type}
        name={`${type} ${data?.ID}`}
        status={`${status}`}
        color={data?.color}
        resetInfo={resetInfo} />
      <StatsBox stats={stats!} time={time} />
      <Timeline events={events!} />
    </div>
  )
}

export default InfoBox

