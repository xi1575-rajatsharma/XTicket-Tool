import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Loader from "../../Components/Loader/Loader";

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

  const COLORS = [
    "#A837FA",
    "#6D67D6",
    "#3C8DF0",
    "#3CCFD6",
    "#8CFFC6",
    "#5D5A8A",
    "#F2B979",
    "#BD5A1C",
    "#767E8A",
    "#48F092",
    "#39A2A3",
    "#703728",
    "#6EF07C",
  ];
  return props.missedByStatus ? (
    <BarChart width={180} height={150} data={props.missedByStatus}>
      <Bar dataKey="value" fill="#8884d8">
        {Object.keys(props.missedByStatus).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
      <Tooltip cursor={{ fillOpacity: 0.3 }} content={<CustomTooltip />} />
    </BarChart>
  ) : (
    <Loader />
  );
};

export default SLAMissedByStatus;
