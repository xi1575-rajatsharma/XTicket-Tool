import React from 'react';
import {Tooltip, Cell,BarChart, Bar,XAxis, YAxis, CartesianGrid,Legend, ResponsiveContainer} from 'recharts';

const StatusBarChart = ({status}) => {
  const COLORS = ['#A837FA', '#6D67D6', '#3C8DF0', '#3CCFD6', '#8CFFC6','#5D5A8A','#F2B979', '#BD5A1C', '#767E8A','#48F092', '#39A2A3', '#703728','#6EF07C'];
    return (
        status ? 
            <ResponsiveContainer height="100%" width="70%">
            <BarChart width={180} height={150} data={status} barSize={30}>
            <XAxis dataKey="name" style={{fontSize: 10, textTransform:"capitalize"}} minTickGap={0}/>
            <YAxis style={{fontSize: 10, textTransform:"capitalize"}} />
    <Bar dataKey="value" fill="#8884d8" width={10} > 
    {
            status.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        
    }
    </Bar>
    <Tooltip cursor={{fillOpacity: 0.3}}    />
  </BarChart>
  </ResponsiveContainer> : null
    )
}

export default StatusBarChart
