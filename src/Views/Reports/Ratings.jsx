import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  } from 'recharts';

const Ratings = (props) => {
    const [zeroRatingCount, setZeroRatingCount] = useState(0);
    useEffect(()=>{
        Object.keys(props.ratings).map((key, index) => props.ratings[key].value <= 0 ? setZeroRatingCount(zeroRatingCount + 1) : null)
    },[props.ratings])
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return (
        props.ratings ?
        zeroRatingCount < 5 ?
        <ResponsiveContainer width="95%" height="100%">
        <PieChart width="100%" height="10%">
        <Pie
          data={props.ratings}
          cx={"40%"}
          cy={"50%"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
      </ResponsiveContainer>
       : "hello"
      : "hello"
      
    )
}

export default Ratings
