import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.scss';

const ConfirmDeleteDialog = (props) => {
    const {
        isOpen,
        handleClose,
        title,
        description,
        onDelete,
    } = props;

    return (
        <div className="delete-dialog-container">
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="delete-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="description-block">
                            <div>{"Are you sure you want to delete?"}</div>
                            <div className="description-text">{description}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="button-block">
                        <Button onClick={handleClose} color="primary" className="cancel">
                            Cancel
                        </Button>
                        <Button onClick={onDelete} color="primary" className="delete" autoFocus>
                            Delete
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmDeleteDialog;
