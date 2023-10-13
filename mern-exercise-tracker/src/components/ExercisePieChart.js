import React from 'react';
import { Pie } from "@ant-design/charts";

const ExercisePieChart = ({ exerciseData }) => {
  const data = exerciseData.map((exercise) => ({
    type: exercise.description,
    value: exercise.duration,
  }));

  var config = {
    appendPadding: 50,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1.0,
    autoFit: false,
    autoFit: true,
    label: {
      type: "outer",
      content: "{name} {percentage}",
      style: {
        overflow: "visible"
      }
    },
    legend: {
      position: "bottom",
      flipPage: false,
      style: {
        textAlign: "center"
      }
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }]
  };
  return <Pie {...config} />;
};

export default ExercisePieChart;