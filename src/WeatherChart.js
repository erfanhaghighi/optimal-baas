import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function WeatherChart({ showLiveData }) {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        if (showLiveData) {
            fetchWeatherData();
        }
    }, [showLiveData]);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                'https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&hourly=temperature_2m,relative_humidity_2m&timezone=Europe/Zurich'
            );

            const hourlyData = response.data.hourly;
            const formattedData = hourlyData.time.map((time, index) => ({
                time: time.substring(11, 16), // Extract HH:MM
                temperature: hourlyData.temperature_2m[index],
                humidity: hourlyData.relative_humidity_2m[index],
            }));

            setWeatherData(formattedData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <h2>Weather Data (Zurich)</h2>
            {showLiveData ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weatherData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
                        <Line type="monotone" dataKey="humidity" stroke="#007bff" name="Humidity (%)" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>Click "Show Live Data" to fetch weather details.</p>
            )}
        </div>
    );
}

export default WeatherChart;
