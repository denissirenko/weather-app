import {api} from '../api/index';

import {types} from './types';

export const forecastActions = Object.freeze({
    isFiltered: (payload)=> {
        return {
            type: types.FORECAST_IS_FILTERED,
            payload,
        }
    },
    notDays: (payload)=>{
        return {
            type: types.FORECAST_NOT_DAYS,payload,
        }
    },
    filterType: (payload)=> {
        return {
            type: types.FORECAST_FILTER_TYPE,
            payload,
        }
    },
    filterMin: (payload)=>{
        return {
            type: types.FORECAST_FILTER_MIN,
            payload
        }
    },
    filterMax: (payload)=>{
        return {
            type: types.FORECAST_FILTER_MAX,
            payload
        }
    },

    startFetching: ()=>{
        return {
            type: types.FORECAST_START_FETCHING,
        }
    },
    stopFetching: ()=>{
        return {
            type: types.FORECAST_STOP_FETCHING,
        }
    },
    fill: (payload)=>{
        return {
            type: types.FORECAST_FILL,
            payload
        }
    },
    setFetchingError: (error)=>{
        return {
            type: types.FORECAST_SET_FETCHING_ERROR,
            error: true,
            payload: error
        }
    },

    // Async

    fetchAsync: () => async(dispatch) => {
        dispatch(forecastActions.startFetching());

        const response = await api.forecast.fetch();

        if(response.status === 200) {
            const {data} = await response.json();
            dispatch(forecastActions.fill(data));
        } else {
            const error = {
                status: response.status
            };
            dispatch(forecastActions.setFetchingError(error));
        }
        dispatch(forecastActions.stopFetching());
    } 

})
