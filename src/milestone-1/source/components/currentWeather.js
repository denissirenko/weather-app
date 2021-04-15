import React from 'react';

export const CurrentWeather = ({...props})=> {
    const {rain_probability, humidity, temperature} = props;
    return (
        <div className="current-weather">
            <p className="temperature">{temperature}</p>
            <p className="meta">
            <span className="rainy">%{rain_probability}</span>
            <span className="humidity">%{humidity}</span>
            </p>
        </div>
    )
}