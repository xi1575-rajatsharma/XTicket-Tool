import React from "react";
import { Doughnut } from "react-chartjs-2";

const AchievedVsViolated = (achieved_vs_missed) => {
  const res_miss = achieved_vs_missed.achieved_vs_missed;

  let xlabel = Object.keys(res_miss);
  const ylabel = Object.values(res_miss);
  const total = ylabel[0] + ylabel[1];
  const zeroPerc = Math.round((ylabel[0] / total) * 100, 1);
  const onePerc = Math.round((ylabel[1] / total) * 100, 1);
  xlabel[0] = `${xlabel[0]} (${zeroPerc}%)`;
  xlabel[1] = `${xlabel[1]} (${onePerc}%)`;
  console.log(xlabel);

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
            text: "Achieved vs Violated SLA's",
            fontSize: 20,
            align: "right",
          },
          plugins: {
            datalabels: {
              display: true,
              color: "white",
            },
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
