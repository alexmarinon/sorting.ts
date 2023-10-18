// display/src/components/BenchmarkPlot.tsx
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const BenchmarkPlot: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/benchmark_results.csv")
            .then(response => response.text())
            .then(csv => {
                const results = Papa.parse(csv, { header: true });
                if (results.data) {
                    // Convert and structure your data as needed for Plotly
                    // This is a simple example, adjust based on your CSV structure
                    const trace1 = {
                        x: results.data.map((row: any) => row["Array Size"]),
                        y: results.data.map((row: any) => row["Bubble Sort Average"]),
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Bubble Sort Average'
                    };
                    // Add more traces for Insertion Sort, Quick Sort, etc.

                    setData([trace1]);
                }
            });
    }, []);

    const layout = {
        title: 'Sorting Algorithm Benchmarks',
        xaxis: {
            title: 'Array Size'
        },
        yaxis: {
            title: 'Execution Time (ms)'
        }
    };

    return <Plot data={data} layout={layout} />;
}

export default BenchmarkPlot;
