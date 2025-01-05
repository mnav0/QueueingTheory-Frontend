import React, { useCallback, useState } from "react";

import "./styles.css"

import { throttle } from "src/utils/throttle"
import { timeInHours } from "src/animation/simHelperFuncs"
import { useInterval } from "src/hooks/useInterval"

import { FaPlay, FaPause } from "react-icons/fa";

interface SliderProps {
  time: number
  setTime: React.Dispatch<React.SetStateAction<number>>
}

export const Slider: React.FC<SliderProps> = ({ time, setTime }) => {
  const throttleChange = throttle((value: string) => setTime(parseInt(value)), 200)
  const handleSliderChange = useCallback(throttleChange, [])
  const [isPlaying, setPlay] = useState(false)
  const [days, hours] = timeInHours(time)

  const increment = () => {
    if (time === 299) return
    setTime(time + 1)
  }

  useInterval(() => {
    if (time === 299) setPlay(false)
    increment()
  }, isPlaying ? 250 : null)

  return (
    <div className="slider-cont">
      <div className="flex w-full items-center">
        <div className="flex justify-center items-center flex-grow">
          <div className="flex text-lg px-2 slider-label">
            <div className="mr-1">
              Day: {days}
            </div>
            <div className="ml-1">
              {hours}:00
          </div>
          </div>
          <button
            className="p-2 border border-black rounded-full mr-2"
            onClick={() => setPlay(!isPlaying)}>
            {isPlaying ? <FaPause className="h-3 w-3" /> : <FaPlay className="h-3 w-3" />}
          </button>
          <div className="slider">
            <input
              type="range"
              id="simTime"
              name="simTime"
              value={time}
              onChange={event => handleSliderChange(event.target.value)}
              min="0"
              max="299"
              step="1"
              title={time.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
