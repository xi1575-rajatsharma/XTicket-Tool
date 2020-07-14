import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieRating = ({ ratings }) => {
  // console.log(ratings);
  const xlabel = Object.keys(ratings);
  const ylabel = Object.values(ratings);
  const state = {
    chartData: {
      labels: xlabel,
      datasets: [
        {
          data: ylabel,
          backgroundColor: [
            "#FFFFCC	",
            "#FFFF99",
            "#FFFF66",
            "#FFFF33",
            "#ffc40c",
          ],
        },
      ],
    },
  };

  return (
    <div>
      <Doughnut
        data={state.chartData}
        height={130}
        options={{
          title: {
            display: true,
            text: "Happiness Rating",
            fontSize: 20,
            align: "left",
          },
          animation: {
            animateScale: true,
          },
          cutoutPercentage: 70,

          legend: {
            display: true,
            position: "right",
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

export default PieRating;
