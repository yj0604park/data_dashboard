import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { SalaryType } from 'models/salary';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface Dataset {
  type: 'line' | 'bar';
  label: string;
  data: number[];
  borderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  fill?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Props {
  salaries: SalaryType[];
}

const BarDiscreteChart: React.FC<Props> = ({ salaries }) => {
  const extractPay = (salaries: SalaryType[], type: 'net' | 'gross'): number[] => {
    return salaries.map((salary) => type === 'net' ? salary.net_pay : salary.gross_pay);
  };

  const transformToChartData = (salaries: SalaryType[]): ChartData => {
    return {
      labels: salaries.map((salary) => new Date(salary.date).toLocaleDateString()), // date를 라벨로 사용
      datasets: [
        {
          type: 'bar',
          label: 'Net Pay',
          data: extractPay(salaries, "net"), // net_pay 데이터 사용
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          type: 'line',
          label: 'Gross Pay',
          data: extractPay(salaries, "gross"), // gross_pay 데이터 사용
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return <Chart type='bar' data={transformToChartData(salaries)} />;
}

export default BarDiscreteChart;
