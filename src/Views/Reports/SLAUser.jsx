import React from "react";
import { Pie } from "react-chartjs-2";

const SLAUser = () => {
  const state = {
    chartData: {
      labels: ["SLA Met", "SLA Missed"],
      datasets: [
        {
          data: [3, 9],
          backgroundColor: [`#FFA500`, `#6495ED`],
        },
      ],
    },
  };

  return (
    <div>
      <Pie
        data={state.chartData}
        height={200}
        options={{
          title: {
            display: true,
            text: "SLA track-User",
            fontSize: 15,
          },
          legend: {
            display: true,
            position: "bottom",
          },
          rotation: Math.PI * -0.1,
        }}
      />
    </div>
  );
};

export default SLAUser;
