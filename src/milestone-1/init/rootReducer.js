import { combineReducers } from 'redux';

import { forecastReducer as forecast } from '../source/reducer';

export const rootReducer = combineReducers({
    forecast,
});
