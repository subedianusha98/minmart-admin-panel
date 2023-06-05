import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {


    const data = {
        labels: ['Title 1', 'Title 2', 'Title 3'],
        datasets: [{
            data: [1200, 5000, 3000],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false, },
            title: { display: false },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (value >= 500) {
                            return value / 500 + "K";
                        }
                        return value;
                    },
                },
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    )
}

export default BarChart