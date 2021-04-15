import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {forecastActions} from './actions';
import { useForecastFetch } from '../hooks/useForecastFetch';
// components
import { Filter } from './components/filters';
import { Head } from './components/head';
import { CurrentWeather } from './components/currentWeather';
// moment js
import moment from 'moment';
import 'moment/locale/ru';

import './styles/index.scss';
import cx from 'classnames';

export const Source = () => {
  const dispatch = useDispatch();

  let { isFetching, data, error, notDays, type, minTemperature, maxTemperature } = useForecastFetch();
  
  const [selectedItem, setSelectedItem] = useState(0);
  
  if(error && error.status === 404) {
      return <p>Not Found</p>;
  }

  if(error && error.status !== 404) {
      return <p>Something went wrong</p>;
  }

  if (!isFetching && data && data.length) {
    if (type && type !== null) {
      data = data.filter(item => item.type === type);
    }
    if (minTemperature) {
      data = data.filter(item => Number(item.temperature) >= Number(minTemperature));
    }
    if (maxTemperature) {
      data = data.filter(item => Number(item.temperature) <= Number(maxTemperature));
    }
    if (!notDays && data.length === 0) {
      dispatch(forecastActions.notDays(true));
    }
  }


  const spinnerJSX = isFetching && (
      <p>Loading Forecast</p>
  );

  const headJSX = !notDays && !isFetching && data && data.length && data.slice(0, 7).map((item, index)=>{
    return (
      index === selectedItem ? <Head key={index} {...item}/> : null
    )
  });

  const currentWeatherJSX = !notDays && !isFetching && data && data.length && data.slice(0, 7).map((item, index)=>{
    return (
      index === selectedItem ? <CurrentWeather key={index} {...item}/> : null
    )
  });

  const notDaysJSX = notDays && (
    <p className='message'>По заданным критериям нет доступных дней!</p>
  );
  

  const listForecastJSX = !notDays && !isFetching && data && data.length && data.slice(0, 7).map((item, index)=>{
    const {day, temperature, type} = item;
    
    const forecastListCx = cx({
      day: true,
      [type]: type,
      selected: index === selectedItem
    });

    const onSelectedItem = (index) => {
      setSelectedItem(index);
    };

    return (
      <div
        onClick={() => onSelectedItem(index)}
        key={index} 
        className={ forecastListCx }
      >
        <p>{moment(day).locale('ru').format('dddd')}</p>
        <span>{temperature}</span>
      </div>
    )
  });


  return (
    <>
      <main>
        {spinnerJSX}

        <Filter />

        { headJSX }

        { currentWeatherJSX }

        <div className="forecast">
          {listForecastJSX}

          {notDaysJSX}
        </div>
      </main>
    </>
  );
};
