import React from "react";
import { Pie } from "react-chartjs-2";

const SLADepartment = () => {
  const state = {
    chartData: {
      labels: ["SLA Met", "SLA Missed"],
      datasets: [
        {
          data: [12, 8],
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
            text: "SLA track -Department",
            fontSize: 12,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </div>
  );
};

export default SLADepartment;
