import React from "react"

import { FaChartBar, FaLaptopMedical, FaQuestionCircle } from "react-icons/fa"

import "./IconBar.css"

interface IconBarProps {
  setSelect: React.Dispatch<React.SetStateAction<string>>
}

export const IconBar: React.FC<IconBarProps> = ({setSelect}) => {
  const iconStyle = "h-6 w-6"

  return (
    <div className="icon-bar">
      <div onClick={() => setSelect("quad")}><FaChartBar className={iconStyle}/></div>
      <div onClick={() => setSelect("anim")}><FaLaptopMedical className={iconStyle}/></div>
      <div onClick={() => setSelect("guide")}><FaQuestionCircle className={iconStyle}/></div> 
    </div>
  )
}

export default IconBar;
