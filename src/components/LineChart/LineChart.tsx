import React from 'react'
import { ResponsiveLine } from "@nivo/line";
import { ChartNode } from '../ChartContainer/ChartContainer';

export const LineChart: React.FC<ChartNode> = ({chartType, xAxisTitle, yAxisTitle, data, color}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'linear' }}
    yScale={{ type: 'linear', 
      min: 'auto', 
      max: 'auto', 
      stacked: true
 
    }}
    curve={"monotoneX"}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: xAxisTitle,
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: yAxisTitle,
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    enableGridX={false}
    colors={color}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
)
export default LineChart;
