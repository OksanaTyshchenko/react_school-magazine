import { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectors } from '../store';
import { ChartData } from '../types';

Chart.register(...registerables);

export const Rating = () => {
  const students = useSelector(selectors.loadStudents);
  const [chartData, setCharData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setCharData({
      labels: students.map(student => student.personName),
      datasets: [
        {
          label: "Середній бал",
          data: students.map(({ marks }) => Object.values(marks).reduce((res, mark) => {
            if (typeof mark.mark === 'number') {
              return res + mark.mark;
            }

            return res + 0;
          }, 0) / Object.values(marks).length),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4)",
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Міжпредметний рейтинг",
          font: {
            size: 20,
          },
        },
      },
    });
  }, [students]);

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}