import {types} from './types';

const initialState = {
    data: null,
    isFetching: false,
    error: null,
    type: null,
    minTemperature: '',
    maxTemperature: '',
    isFiltered: false,
    notDays: false,
};

export const forecastReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case types.FORECAST_IS_FILTERED:
            return {
                ...state,
                isFiltered: payload,
            };
        case types.FORECAST_NOT_DAYS:
            return {
                ...state,
                notDays: payload,
            }; 
        case types.FORECAST_FILTER_TYPE:
            return {
                ...state,
                type: payload,
            }; 
        case types.FORECAST_FILTER_MIN:
            return {
                ...state,
                minTemperature: payload,
            }; 
        case types.FORECAST_FILTER_MAX:
            return {
                ...state,
                maxTemperature: payload,
            }; 

        case types.FORECAST_START_FETCHING:
            return {
                ...state,
                isFetching: true
            };        
        case types.FORECAST_STOP_FETCHING:
            return {
                ...state,
                isFetching: false  
            };
        case types.FORECAST_SET_FETCHING_ERROR:
            return {
                ...state,
                error: payload,
                data: null,
            };
        case types.FORECAST_FILL:
            return {
                ...state,
                data: payload,
                error: null
            };

        default: 
            return state;
    }
}
