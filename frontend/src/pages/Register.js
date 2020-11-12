import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    Container,
    Grid,
} from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './../styles/Register.scss';

import {
    getAllEmployees,
    addEmployee,
    editEmployee,
    removeEmployee,
} from './../store/Employee/actions';

import {
    employeeTableHeaders,
    employeeFormFields,
} from './../utils/static';

import {
    prepareDate,
} from './../utils/util';

import Table from './../components/Table';
import Form from './../components/EmployeeModal';
import Pagination from './../components/Paginator';
import ConfirmDeleteDialog from './../components/ConfirmDeleteDialog';
const pageSize = 10;

const Register = () => {
    const [employee, setEmployee] = useState([]);
    const [isAddModal, setIsAddModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('firstName');  // current sortable field
    const [sortValue, setSortValue] = useState(1);  // cureent sortable value
    const [isDeleteDialog, setIsDeleteDialog] = useState(false); // handle confirm delete dialog

    const dispatch = useDispatch();

    const {
        error,
        employees,
        isAddEmployee,
        isEditEmployee,
        isRemoveEmployee,
        totalPages,
        totalCount
    } = useSelector(
        store => store.employee
    );

    useEffect(() => {
        setEmployee(employees);
    }, [employees]);

    useEffect(() => {
        if (isAddEmployee) {
            setIsAddModal(false);
            NotificationManager.success('Successfully added employee.', 'Success');
        }
    }, [isAddEmployee]);

    useEffect(() => {
        if (isEditEmployee) {
            setIsEditModal(false);
            NotificationManager.success('Successfully updated employee.', 'Success');
        }
    }, [isEditEmployee]);

    useEffect(() => {
        if (isRemoveEmployee) {
            setIsDeleteDialog(false);
            NotificationManager.success('Successfully removed employee.', 'Success');
        }
    }, [isRemoveEmployee]);

    useEffect(() => {
        if (error.message) {
            NotificationManager.error(error.message, 'Error');
        }
    }, [error]);

    const onClick = () => {
        const options = prepareGetAllOptions(currentPage, sortColumn, sortValue);
        dispatch(getAllEmployees(options));
    }

    const handleAddEmployee = () => {
        setIsAddModal(true);
    }

    const handleEditEmployee = (index) => {
        setIsEditModal(true);
        setSelectedRecord(employee[index]);
    }

    const handleModalClose = () => {
        setIsAddModal(false);
        setIsEditModal(false);
        setIsDeleteDialog(false);
    }

    const onEditEmployee = (data) => {
        dispatch(editEmployee(data._id, data))
    }

    const onAddEmployee = (data) => {
        dispatch(addEmployee(data));
    }

    const handleDeleteEmployee = (index) => {
        setSelectedRecord(employee[index]);
        setIsDeleteDialog(true);
    }

    const onRemoveEmployee = (index) => {
        dispatch(removeEmployee(selectedRecord._id));
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        const options = prepareGetAllOptions(value, sortColumn, sortValue);
        dispatch(getAllEmployees(options));
    }

    const handleSortChange = (field, value) => {
        const options = prepareGetAllOptions(currentPage, field, value * -1);
        setSortColumn(field);
        setSortValue(value * -1);
        dispatch(getAllEmployees(options))
    }

    const employeeObj = {
        firstName: '',
        lastName: '',
        age: 18,
        address: '',
        designation: '',
    }

    return (
        <div className="main-container">
            <div className="header-block">
                <h1>Welcome to Employee Portal</h1>
            </div>

            <Container maxWidth="md">
                <Grid container item xs={12} spacing={3}>
                    <div className="button-block">
                        <Button variant="contained" className="show-data" onClick={() => onClick()}>
                            Show Data
                        </Button>
                        <Button variant="contained" className="add" onClick={() => handleAddEmployee()}>
                            + Add
                        </Button>
                    </div>
                    <Table
                        tableHeader={employeeTableHeaders}
                        tableBody={prepareTableBody(employee, employeeTableHeaders)}
                        handleEdit={handleEditEmployee}
                        handleRemove={handleDeleteEmployee}
                        handleSortChange={handleSortChange}
                        sortColumn={sortColumn}
                        sortValue={sortValue}
                    />
                    {!employee.length ? (
                        <div className="no-data-block">
                            <p>No Data Available</p>
                            <p>Click on Show Data to load data or add employee</p>
                        </div>
                    ) : null}
                    <div className="pagination-block">
                        <div className="currentData-info">
                            {totalCount ? preparePaginationData(currentPage, employee.length, totalCount) : null}
                        </div>
                        <Pagination
                            count={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </Grid>
            </Container>

            {(isAddModal || isEditModal) &&
                <Form
                    isOpen={isAddModal || isEditModal}
                    handleClose={handleModalClose}
                    data={isEditModal ? selectedRecord : employeeObj}
                    isEdit={isEditModal}
                    onEditEmployee={onEditEmployee}
                    onAddEmployee={onAddEmployee}
                    formFields={employeeFormFields}
                />}

            {isDeleteDialog && <ConfirmDeleteDialog
                isOpen={isDeleteDialog}
                handleClose={handleModalClose}
                onDelete={onRemoveEmployee}
                title={'Confirm Delete Dialog'}
                description={"Deleting employee can't be undone."}
            />}

            <NotificationContainer />

        </div>
    );
};

function prepareGetAllOptions(pageNumber, field, value) {
    const obj = {
        pageNumber,
        field,
        value,
    };
    return obj;
}

function prepareTableBody(data, tableFields) {
    let tableBody = [];
    data.map(record => {
        let recordObj = [];
        tableFields.map(i => {
            if (i.key === 'created_at')
                recordObj.push(prepareDate(record[i.key]));
            else
                recordObj.push(record[i.key]);
        })
        tableBody.push(recordObj);
    })
    return tableBody;
}

function preparePaginationData(currentPage, currentRecords, totalCount) {
    if(currentPage > 1) {
        return `${(currentPage - 1) * pageSize + 1} - ${currentRecords + pageSize} of ${totalCount}`;
    }
    return `1 - ${currentRecords} of ${totalCount}`;
}

export default Register;