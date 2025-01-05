import React from 'react'
import { LineChart } from '../LineChart';
import "./ChartContainer.css";
import { Serie } from '@nivo/line';

export interface ChartNode {
  chartType: string;
  xAxisTitle: React.ReactNode;
  yAxisTitle: React.ReactNode;
  data: Serie[];
  color: string;
}

export const ChartContainer: React.FC<ChartNode> = ({...ChartProps}) => {
  return (
    <div className="outer text-center">
      <div className="innerLabel">
          {ChartProps.chartType}
        </div>
        <div className="innerChart">
          <LineChart {...ChartProps} />
        </div>
    </div>
  ) 
}
export default ChartContainer;
