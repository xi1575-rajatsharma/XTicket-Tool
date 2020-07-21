import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const AverageEfficiency = ({ averageHours }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let x = 0;
    const timer = setInterval(() => {
      if (x <= Math.floor(averageHours)) {
        x++;
        setCount(x);
      } else {
        clearInterval(timer);
      }
    }, 10);
  }, []);

  return (
    <div className="averageEfficiency">
      <p>average Hours</p>
      <div className="averageEfficiency__hour" title={false} >
        <CountUp end={averageHours ? averageHours : 0} duration={3} />
        <span className="averageEfficiency__hrs">Hrs</span>
      </div>
    </div>
  );
};
export default AverageEfficiency;
