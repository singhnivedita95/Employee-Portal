import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Paginator = (props) => {
    const classes = useStyles();
    const {
        count,
        currentPage,
        handlePageChange,
    } = props;
    return (
        <div className={classes.root}>
            <Pagination count={count} page={currentPage} onChange={handlePageChange} />
        </div>
    );
}

export default Paginator;
