import { combineReducers } from 'redux';
import EmployeeReducer from './../Employee/reducer';

export const reducers =  combineReducers({
    employee: EmployeeReducer,
});