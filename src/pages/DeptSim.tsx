import React, { useState } from 'react';

import "../App/App.css"

import { IntroContainer } from "src/components/IntroContainer"
import { SimContainer } from "src/components/SimContainer"
import { IconBar } from "src/components/IconBar"
import { ED } from 'src/simulatorV2/tsSim/ED';

const DeptSim = () => {
  const [selected, setSelect] = useState("anim")

  return (
    <div className="app h-screen flex items-stretch">
      <div className="app-left flex flex-col relative justify-center p-4 bg-gray-700 text-gray-300">
        <IconBar setSelect={setSelect} />
        <IntroContainer pageType="dept" />
      </div>
      <div className="app-right flex flex-col justify-center p-4 flex-1">
        <SimContainer selected={selected} />
      </div>
    </div>
  );
}

export default DeptSim;
