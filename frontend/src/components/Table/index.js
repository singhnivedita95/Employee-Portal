import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';

import {
    ArrowDropDown,
    ArrowDropUp,
} from '@material-ui/icons';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const CustomizeTable = (props) => {
    const classes = useStyles();
    const {
        tableHeader,
        tableBody,
        handleEdit,
        handleRemove,
        handleSortChange,
        sortValue,
        sortColumn,
    } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {tableHeader.map((item, index) => (
                            <StyledTableCell onClick={() => handleSortChange(item.key,sortValue)}>
                                {item.value}
                                {sortColumn === item.key ? sortValue === 1 ? <ArrowDropUp/> : <ArrowDropDown/> : null}
                            </StyledTableCell>
                        ))}
                        <StyledTableCell/>
                        <StyledTableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody && tableBody.map((row, index) => (
                        <StyledTableRow key={row.name}>
                            {row.map(i => (
                                <StyledTableCell>{i}</StyledTableCell>
                            ))}
                            <StyledTableCell>
                                <EditIcon onClick={() => handleEdit(index)} style={{cursor: "pointer"}}/>
                            </StyledTableCell>    
                            <StyledTableCell>
                                <DeleteIcon onClick={() => handleRemove(index)} style={{cursor: "pointer"}}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomizeTable;
