import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
};



// new Date().toISOString().split('T')[0];


export default function Chart({ data }) {
    


    const chartData = {
        labels: data.map(({ date }) => new Date(date).toISOString().split('T')[0]),
        datasets: [
            {
                label: 'Satış sayı',
                data: data.map(({ amount }) => amount),
                backgroundColor: '#ffb326',
                borderColor: "#ffb326",
                borderRadius: 2,
            },
        ],
    };
    return (
        <div>
            <Line options={options} data={chartData} />
        </div>
    )

}
