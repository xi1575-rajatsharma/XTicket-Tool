import React from 'react';
import {Tooltip, Cell,BarChart, Bar,XAxis, YAxis, CartesianGrid,Legend, ResponsiveContainer} from 'recharts';

const StatusBarChart = ({status}) => {
    return (
        status ? 
            <ResponsiveContainer height="100%" width="70%">
            <BarChart width={180} height={150} data={status} barSize={30}>
            <XAxis dataKey="name" style={{fontSize: 10, textTransform:"capitalize"}} minTickGap={0}/>
            <YAxis style={{fontSize: 10, textTransform:"capitalize"}} />
    <Bar dataKey="value" fill="#8884d8" width={10} > 
    {
    status.map((entry,index) => {
         switch(entry.name){
           case "OPEN":
           return <Cell  fill= { "#ff8000"} />;
           case "INPROGRESS":
           return <Cell  fill= { "#99cc00"} />;
           case "AWATING":
          return <Cell  fill= { "#0000e6"} />;
           case "REVIEW":
          return <Cell  fill= { "#220066"} />;
          case "ESCALATED":
           return <Cell  fill= { "#ff3300"} />;
           case "REOPENED":
           return <Cell  fill= { "#cc0052"} />;
           case "CLOSED":
           return <Cell  fill= { "#5cd65c"} />;
           case "RESOLVED":
           return <Cell  fill= { "#003300"} />;
           default: 
           return <Cell  fill= { "#80ff80"} />;
     } 
         }
    )}
    </Bar>
    <Tooltip cursor={{fillOpacity: 0.3}}    />
  </BarChart>
  </ResponsiveContainer> : null
    )
}

export default StatusBarChart
