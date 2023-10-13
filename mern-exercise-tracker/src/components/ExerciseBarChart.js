import React from 'react';
import { Bar } from '@ant-design/charts';

const ExerciseBarChart = ({ exerciseData }) => {
  const data = exerciseData.map((exercise) => ({
    hour: new Date(exercise.date).getHours(),
    duration: exercise.duration,
  }));

  const config = {
    data,
    xField: 'hour',
    yField: 'duration',
    seriesField: 'hour',
    legend: { position: 'top' },
    responsive: true,
  };

  return <Bar {...config} />;
};

export default ExerciseBarChart;