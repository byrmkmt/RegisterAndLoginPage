import { useEffect, useState } from "react";
import apiPostRequest from "../api/Api"
import { useError } from "../contexts/ErrorContext";

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Box, Typography,
TableBody, TablePagination
} from '@mui/material';

export default function LatestTransfersPanel({latestTransfers}){
    const username = localStorage.getItem("username") || ""; 
    const {hasError, setHasError, clearErrors} = useError(); 
    const [transfers, setTransfers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    const columns = [
        { id: 'firstName', label: 'İsim', minWidth: 100, align:'center' },
        { id: 'lastName', label: 'Soyisim', minWidth: 100, align:'center' },
        {
            id: 'quantity',
            label: 'Tutar',
            minWidth: 100,
            align: 'center',
            format: (value) => value.toLocaleString('tr-TR'),
        }
    ];

    useEffect(() => {
        async function fetchData() {
            const {success, result} = await apiPostRequest(null,"http://localhost:8084/account/recentlyTransferList/" + username,
                                            {setHasError, hasError, clearErrors});
            if (success) {
                setTransfers(result.data); 
            } 
        }
        fetchData();
    },[username]);
    return (
        <Paper sx={{ width: '30%', overflow: 'hidden', borderRadius:'10px'}}>
            <Box
                sx={{
                    backgroundColor: 'rgb(70, 136, 192)',
                    color:  '#fff',
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                }}
            >
                <Typography variant="h6">Transfer Geçmişi</Typography>
            </Box>            
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth,
                                    backgroundColor: "#F4FAFF",
                                    fontWeight: "bold"
                                 }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>                     
                    </TableHead>      
                    <TableBody>
                        {transfers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value) + ' TL'
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>                                     
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={transfers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />            
        </Paper>
    );
    
}
