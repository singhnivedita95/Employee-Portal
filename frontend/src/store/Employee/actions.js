import {
    GET_ALL_SUCCESS,
    GET_ALL_PENDING,
    GET_ALL_FAILURE,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_PENDING,
    ADD_EMPLOYEE_FAILURE,
    EDIT_EMPLOYEE_SUCCESS,
    EDIT_EMPLOYEE_PENDING,
    EDIT_EMPLOYEE_FAILURE,
    REMOVE_EMPLOYEE_SUCCESS,
    REMOVE_EMPLOYEE_PENDING,
    REMOVE_EMPLOYEE_FAILURE,
} from './constants';

import {
    getAll,
    add,
    edit,
    remove,
} from './../../services/Employee';

export const getAllEmployees = (options) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_PENDING });
        getAll(options)
        .then((res) => {
            const { data, totalPages, totalCount } = res.data;
            return dispatch({
                type: GET_ALL_SUCCESS,
                payload: {
                    employees: data,
                    totalPages,
                    totalCount,
                },
            })
        })
        .catch((error) => {
            return dispatch({
                type: GET_ALL_FAILURE,
                payload: error,
            })
        })
    }
};

export const addEmployee = (employee) => async (dispatch) => {
    dispatch({ type: ADD_EMPLOYEE_PENDING });
    add(employee)
        .then((res) => {
            const options = {
                pageNumber: 1,
                field: 'firstName',
                value: 1,
            }
            dispatch(getAllEmployees(options))
            return dispatch({
                type: ADD_EMPLOYEE_SUCCESS,
                payload: res.data,
            })
        })
        .catch((error) => {
            return dispatch({
                type: ADD_EMPLOYEE_FAILURE,
                payload: error.response.data,
            });
        });
};

export const editEmployee = (id, employee) => async (dispatch) => {
    
    dispatch({ type: EDIT_EMPLOYEE_PENDING });
    edit(id, employee)
        .then((res) => {
            return dispatch({
                type: EDIT_EMPLOYEE_SUCCESS,
                payload: {
                    id,
                    data: employee,
                }
            });
        })
        .catch((err) => {
            return dispatch({
                type: EDIT_EMPLOYEE_FAILURE,
                payload: err.response.data,
            });
        })
}

export const removeEmployee = (id) => async (dispatch) => {
    dispatch({ type: REMOVE_EMPLOYEE_PENDING });
    await remove(id)
        .then((res) => {
            return dispatch({
                type: REMOVE_EMPLOYEE_SUCCESS,
                payload: id,
            });
        })
        .catch((err) => {
            return dispatch({
                type: REMOVE_EMPLOYEE_FAILURE,
                payload: err.response.data,
            });
        })
};
