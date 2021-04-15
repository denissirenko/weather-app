import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forecastActions} from '../source/actions';


export const useForecastFetch = ()=>{
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(forecastActions.fetchAsync());
    }, [dispatch])

    const {
        data,
        isFetching,
        error,
        notDays,
        type,
        minTemperature,
        maxTemperature,
        isFiltered
    } = useSelector((state)=>state.forecast);

    return {
        data,
        isFetching,
        error,
        notDays,
        type,
        minTemperature,
        maxTemperature,
        isFiltered
    }
}
