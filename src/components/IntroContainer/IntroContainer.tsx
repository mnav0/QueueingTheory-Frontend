import React from 'react'
import { IntroText } from "src/components/IntroText"
import { InputContainer } from "src/components/InputContainer"
import "./IntroContainer.css";

interface IntroProps {
  pageType: string
}

export const IntroContainer: React.FC<IntroProps> = ({ pageType }) => {
  
  return (
    <div className="container">
      <IntroText pageType={pageType}></IntroText>
      <InputContainer pageType={pageType}></InputContainer>
    </div>
  )
}
export default IntroContainer;
