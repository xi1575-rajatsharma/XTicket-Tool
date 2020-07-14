import React from "react";
import { Doughnut } from "react-chartjs-2";

const AchievedVsViolated = (achieved_vs_missed) => {
  const res_miss = achieved_vs_missed.achieved_vs_missed;

  const xlabel = Object.keys(res_miss);
  const ylabel = Object.values(res_miss);

  const state = {
    chartData: {
      labels: xlabel,
      datasets: [
        {
          data: ylabel,
          backgroundColor: [" #4040a1", "#d64161"],
        },
      ],
    },
  };

  return (
    <div>
      <Doughnut
        data={state.chartData}
        height={200}
        options={{
          title: {
            display: true,
            text: "Achieved vs Violated",
            fontSize: 20,
            align: "right",
          },
          cutoutPercentage: 80,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#000000",
              fontSize: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default AchievedVsViolated;
