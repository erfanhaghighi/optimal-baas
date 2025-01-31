import React, { useState } from 'react';
import WeatherChart from './WeatherChart'; // Component for displaying charts
import './App.css';

function App() {
    const [showLiveData, setShowLiveData] = useState(false);

    return (
        <div className="container">
            <h1 className="title">Optimal BaaS Dashboard</h1>
            
            {/* Weather Chart Component */}
            <WeatherChart showLiveData={showLiveData} />

            {/* Button to display live data */}
            <button className="live-button" onClick={() => setShowLiveData(!showLiveData)}>
                {showLiveData ? 'Hide Live Data' : 'Show Live Data'}
            </button>
        </div>
    );
}

export default App;
