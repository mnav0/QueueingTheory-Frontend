import React from 'react'
import { IntroText } from "src/components/IntroText"
import { InputContainer } from "src/components/InputContainer"
import "./IntroContainer.css";

export const IntroContainer: React.FC = () => {

  return (
    <div className="container">
      <IntroText></IntroText>
      <InputContainer></InputContainer>
    </div>
  )
}
export default IntroContainer;
