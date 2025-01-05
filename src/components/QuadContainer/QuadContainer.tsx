import React from 'react'
import { ChartContainer } from "src/components/ChartContainer"
import "./QuadContainer.css";
import { useResults } from "src/state"

interface xyStructure {
  x: number,
  y: number
}

function populateResultsData(results: Array<number>): Array<xyStructure> {
  const answer: Array<xyStructure> = []
  results.map((key, index) => answer.push({x: index, y: results[index]}))
  return answer
}

export const QuadContainer: React.FC = () => {
  const results = useResults()

  if (results.docs?.length === 0) {
    return (
      <div className="quad-alt text-center">
        Please run the simulation to access the graphs!
      </div>
    )
  }

  console.log(results)
  
  const totalsData = [{
    id: "totalsData",
    data: populateResultsData(results.totals)
  }]
  const waitsData = [{
    id: "waitsData",
    data: populateResultsData(results.waits)
  }]
  const queueData = [{
    id: "queueData",
    data: populateResultsData(results.queueLengths)
  }]

  return (
    <div className="quadrant h-full">
      <div className="border border-black" id="a">
        <ChartContainer chartType="Mean Length of Stay" xAxisTitle="Time" yAxisTitle="Totals" data={totalsData} color="#f5b727"/>
      </div>
      <div className="border border-black" id="b">
        <ChartContainer chartType="Mean Wait Time" xAxisTitle="Time" yAxisTitle="Waits" data={waitsData} color="#a44ad9"/>
      </div>
      <div className="border border-black" id="c">
        <ChartContainer chartType="Wait Room Volume" xAxisTitle="Time" yAxisTitle="Queue Lengths" data={queueData} color="#87b5ff"/>
      </div>
      <div className="flex border border-black empty-container" id="d">
        <div className="m-auto flex-1">
            No info to display
        </div>
      </div>
    </div>
  )
}
export default QuadContainer;
