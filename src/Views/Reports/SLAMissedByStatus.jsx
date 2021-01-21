import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const SLAMissedByStatus = (props) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
              {/* <p className="intro">{getIntroOfPage(label)}</p> */}
              {/* <p className="desc">Anything you want can be displayed here.</p> */}
            </div>
          );
        }
      
        return null;
      };
    return (
        props.missedByStatus ?
        <BarChart width={180} height={150} data={props.missedByStatus}>
        <Bar dataKey="value" fill="#8884d8" />
        <Tooltip cursor={{fillOpacity: 0.3}}  content={<CustomTooltip />}  />
      </BarChart> : "hello"
    )
}

export default SLAMissedByStatus;
