import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'bottom' },
            title: { display: false },
        },
        layout: {
            padding: 10, // Adjust the padding of the chart
          },
    };

    return (
        <Pie data={data} options={options} />
    );
};

export default PieChart;
