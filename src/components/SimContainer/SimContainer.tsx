import React from "react"
import { QuadContainer } from "src/components/QuadContainer"
import { Guide } from "src/components/Guide"
import SimAnimation from "src/animation/SimAnimation/SimAnimation"

interface SimContainerProps {
  selected: string
}

export const SimContainer: React.FC<SimContainerProps> = ({selected}) => {
  if (selected === "quad") return (
    <>
      <QuadContainer />
    </>
  )
  if (selected === "anim") return (
    <>
      <SimAnimation />
    </>
  )

  if (selected === "guide") return (
    <>
      <Guide />
    </>
  )

  return (
    <div>
      "Error, item must be selected"
    </div>
  )
}

export default SimContainer
