import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.scss';

const FormDialog = (props) => {
    const {
        isOpen,
        handleClose,
        isEdit,
        data,
        onEditEmployee,
        onAddEmployee,
        formFields,
    } = props;
    const [record, setRecord] = useState(data);
    const [isError, setIsError] = useState(false);
    const [errMessageObj, setErrMessageObj] = useState({});

    const handleInputChange = (e, key) => {
        setRecord({ ...record, [key]: e.target.value });
    }

    const handleAddClick = () => {
        const obj = validataData(record);
        setIsError(obj.error);
        setErrMessageObj(obj);
        if (!obj.error) {
            if (isEdit) {
                onEditEmployee(record);
                return;
            }
            onAddEmployee(record);
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {isEdit ? 'Edit Employee' : 'Add Employee'}
            </DialogTitle>
            <DialogContent>
                {formFields.map(i => (
                    <TextField
                        error={isError && errMessageObj[i.key]}
                        margin="dense"
                        label={i.value}
                        fullWidth
                        type={i.key==='age' ? "number" : "text"}
                        required={i.key!=='address'}
                        value={record[i.key]}
                        helperText={isError && errMessageObj[i.key]}
                        onChange={(e) => handleInputChange(e, i.key)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <div className="button-block">
                    <Button onClick={handleClose} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={() => handleAddClick()} color="primary"
                        className="add-update-block">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>

    );
}

function validataData(data) {
    let errObj = {};
    let isError = false;
    if (!data.firstName) {
        isError = true;
        errObj.firstName = "First Name is missing.";
    }
    if (!data.lastName) {
        isError = true;
        errObj.lastName = "Last Name is missing.";
    }
    if (!data.age) {
        isError = true;
        errObj.age = "Age is missing.";
    }
    if (!data.designation) {
        isError = true;
        errObj.designation = "Designation is missing."
    }
    if (data.age < 18 || data.age >= 100) {
        isError = true;
        errObj.age = "Age must be in range of 18 to 100."
    }
    errObj.error = isError;
    return errObj;
}

export default FormDialog;
