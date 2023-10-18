import React from 'react';
import './App.css';
import BenchmarkPlot from './components/BenchmarkPlot';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Benchmark Results</h1>
                <BenchmarkPlot />
            </header>
        </div>
    );
}

export default App;
