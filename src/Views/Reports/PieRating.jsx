import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { set } from "lodash";

const PieRating = ({ ratings }) => {
  const [count, setCount] = useState(0);
  // for (let rating of ratings) {
  //   console.log(rating)
  // }
  // console.log(ratings)
  const xlabel = Object.keys(ratings ? ratings : null);

  const ylabel = Object.values(ratings ? ratings : null);

  const state = {
    chartData: {
      labels: xlabel,
      datasets: [
        {
          data: ylabel,
          backgroundColor: [
            "red",
            "#FF4D00",
            "#FF4D00",
            "#76BA1B",
            "#1E5631",
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
          plugins: {
            datalabels: {
              display: true,
              color: "white",
            },
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
              fontSize: 12,
            },
          },
          responsiveAnimationDuration: 5
        }}
      />
    </div>
  );
};

export default PieRating;
