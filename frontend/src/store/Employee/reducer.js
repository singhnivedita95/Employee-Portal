import {
    GET_ALL_PENDING,
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_PENDING,
    ADD_EMPLOYEE_FAILURE,
    EDIT_EMPLOYEE_SUCCESS,
    EDIT_EMPLOYEE_PENDING,
    EDIT_EMPLOYEE_FAILURE,
    REMOVE_EMPLOYEE_SUCCESS,
    REMOVE_EMPLOYEE_PENDING,
    REMOVE_EMPLOYEE_FAILURE
} from './constants';

import {initialState} from './state';

const EmployeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_PENDING: 
            return {
                ...state,
                isLoading: true,
                error: {},
            };
        
        case GET_ALL_SUCCESS:
            const { employees, totalPages, totalCount } = action.payload;
            return {
                ...state,
                isLoading: false,
                error: {},
                employees: employees,
                totalPages: totalPages,
                totalCount: totalCount,
            };
        
        case GET_ALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case ADD_EMPLOYEE_PENDING:
            return {
                ...state,
                isLoading: true,
                error: {},
                isAddEmployee: false,
            };

        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: {},
                employees: [action.payload, ...state.employees],
                isAddEmployee: true,
            };

        case ADD_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case EDIT_EMPLOYEE_PENDING:
            return {
                ...state,
                isLoading: true,
                error: {},
                isEditEmployee: false,
            };

        case EDIT_EMPLOYEE_SUCCESS:
            const { id, data } = action.payload;
            return {
                ...state,
                isLoading: false,
                error: {},
                employees: state.employees.map(i => i._id === id ? data : i ),
                isEditEmployee: true,
            };

        case EDIT_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case REMOVE_EMPLOYEE_PENDING:
            return {
                ...state,
                isLoading: true,
                error: {},
                isRemoveEmployee: false,
            };

        case REMOVE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: {},
                employees: state.employees.filter(i => i._id !== action.payload),
                isRemoveEmployee: true,
            };

        case REMOVE_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return initialState;
    }
};

export default EmployeeReducer;