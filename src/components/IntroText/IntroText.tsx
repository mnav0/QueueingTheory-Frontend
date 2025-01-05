import React from 'react'
import "./IntroText.css";

export const IntroText: React.FC = () => {

  return (
    <div className={"text-center"}>
      <label className={"intro xs:text-xs sm: text-xl lg:text-2xl"}>Emergency Department Queueing Calculator</label>
      <div className={"p-2"}></div>
      <label className={"intro-detail"}>Demystifying how queueing causes delays in the emergency department.</label>
      <div className={"p-2"}></div>
    </div>
  )
}
export default IntroText;
