import React, { useState, useEffect } from "react";

const AverageEfficiency = ({averageHours}) => {
  const [progressPercent, setProgressPercent] = useState(0);
  

  useEffect(()=>{
    setProgressPercent((averageHours/48)*100);
  }, [averageHours])
  // const progressPercent = averageHours ? (averageHours/48)*100 : null;
  return(
    averageHours ?
    <div className="reports-container__top--progressBar">
    <div className="reports-container__top--progressBar-startTick">0</div>
    <div className="reports-container__top--progressBar-endTick">48</div>
      {/* <div className="reports-container__top--progressBar-startTickNumber"></div> */}
      { averageHours ?(
      <div className="reports-container__top--progressBar-filler"
      style={progressPercent ? {width: progressPercent >= 100 ? `100%` : `${progressPercent}%`, borderRadius: progressPercent >=96 ? '50px': '100px 0 0 100px'} : {width: 0}}
      ></div> ): null}
    </div> : 
    <div className="reports-container__top--progressBar reports-container__top--progressBar-animation"></div>
  )
};
export default AverageEfficiency;

