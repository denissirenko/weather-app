import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import { useForecastFetch } from '../../hooks/useForecastFetch';
import {forecastActions} from '../actions';

import cx from 'classnames';

export const Filter = ()=> {
  
  const dispatch = useDispatch();

  const { isFiltered, minTemperature, maxTemperature } = useForecastFetch();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [selectedCloudy, setSelectedCloudy] = useState(false);
  const [selectedSunny, setSelectedSunny] = useState(false);
  const [disabledFilterItem, setDisabledFilterItem] = useState(false);

  const [filterType, setFilterType] = useState(null);

  const [minTemperatureValue, setMinTemperatureValue] = useState(minTemperature);
  const [maxTemperatureValue, setMaxTemperatureValue] = useState(maxTemperature);

  const selectedCloudyCX = cx({
    checkbox: true,
    selected: selectedCloudy,
    blocked: disabledFilterItem
  });

  const selectedSunnyCX = cx({
    checkbox: true,
    selected: selectedSunny,
    blocked: disabledFilterItem
  });

  const onselectedType = (type) => {
    setFilterType(type);
    if(type === 'cloudy') {
      setSelectedSunny(false)
      setSelectedCloudy(true)
    } else if (type === 'sunny') {
      setSelectedCloudy(false)
      setSelectedSunny(true)
    }
    setBtnDisabled(false);
  }

  const handleChangeMinTemperature = (e) => {
    setMinTemperatureValue(e.target.value);
    if(e.target.value === '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }

  const handleChangeMaxTemperature = (e) => {
    setMaxTemperatureValue(e.target.value);
    if(e.target.value === '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }

  const onsubmitFilter = () => {
    dispatch(forecastActions.filterType(filterType));
    dispatch(forecastActions.filterMin(minTemperatureValue));
    dispatch(forecastActions.filterMax(maxTemperatureValue));
    dispatch(forecastActions.isFiltered(true));
    setDisabledFilterItem(true);
  }

  const onResetFilter = () => {
    dispatch(forecastActions.fetchAsync());
    dispatch(forecastActions.filterType(null));
    dispatch(forecastActions.filterMin(''));
    dispatch(forecastActions.filterMax(''));
    dispatch(forecastActions.notDays(false));
    dispatch(forecastActions.isFiltered(false));
    setMinTemperatureValue('');
    setMaxTemperatureValue('');
    setSelectedCloudy(false);
    setSelectedSunny(false);
    setDisabledFilterItem(false);
  }

  return (
    <div className="filter">
      <span 
        className={selectedCloudyCX}
        onClick={ !disabledFilterItem ? () => onselectedType('cloudy') : null}
      >
        Облачно
      </span>
      <span 
        className={selectedSunnyCX}
        onClick={ !disabledFilterItem ? () => onselectedType('sunny') : null}
      >
        Солнечно
      </span>

      <p className="custom-input">
        <label htmlFor="min-temperature">Минимальная температура</label>
        <input 
          onChange = {handleChangeMinTemperature}
          value={minTemperatureValue}
          id="min-temperature" 
          type="number" 
          disabled={disabledFilterItem}
        />
      </p>
      <p className="custom-input">
        <label htmlFor="max-temperature">Максимальная температура</label>
        <input 
          onChange = {handleChangeMaxTemperature}
          value={maxTemperatureValue}
          id="max-temperature" 
          type="number" 
          disabled={disabledFilterItem}
        />
      </p>
      {isFiltered ? <button
        onClick={onResetFilter}
      >
        Сбросить
      </button> : <button 
        onClick={onsubmitFilter}
        disabled = {btnDisabled}>
        Отфильтровать
      </button>}
    </div>
  )
}