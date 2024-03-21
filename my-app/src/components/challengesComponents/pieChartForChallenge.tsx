import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';





export function PieChartForChallenge({daysLeft , daysofChallenge} : {daysLeft : any , daysofChallenge : any}) {

    const data = [
        { name: 'A1', value: daysLeft },
        { name: 'A2', value: daysofChallenge },
      ];

      const gradientOffset = () => {
        const dataMax = Math.max(...data.map((entry) => entry.value));
        const dataMin = Math.min(...data.map((entry) => entry.value));
      
        if (dataMax <= 0) {
          return 0;
        }
        if (dataMin >= 0) {
          return 1;
        }
      
        return dataMax / (dataMax - dataMin);
      };
      
      const off = gradientOffset();

      
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={30}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#color-${index})`}
            />
          ))}
        </Pie>
        <defs>
          {data.map((entry, index) => (
            <linearGradient key={`color-${index}`} id={`color-${index}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset={off} stopColor="#8884d8" stopOpacity={0.8} />
            </linearGradient>
          ))}
        </defs>
      </PieChart>
    </ResponsiveContainer>
  );
}
