import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';

function createData(date, adress, email, method, amount, status, order) {
  return { date, adress, email, method, amount, status, order};
}

const rows = [
  createData('Aug 30, 2022', 'xxxxxxx', 'xxxxxxx@gmail.com', 'xxxxx', 'xxxxx$', 'Pending', 4321),
  createData('Aug 5, 2022', 'xxxxxxx', 'xxxxxxx@gmail.com', 'xxxxx', 'xxxxx$', 'In Progress', 8741),
  createData('June 12, 2022', 'xxxxxxx', 'xxxxxxx@gmail.com', 'xxxxx', 'xxxxx$', 'Completed', 7411),
  createData('July 2, 2022', 'xxxxxxx', 'xxxxxxx@gmail.com', 'xxxxx', 'xxxxx$', 'Completed', 9312),
  createData('April 22, 2022', 'xxxxxxx', 'xxxxxxx@gmail.com', 'xxxxx', 'xxxxx$', 'Pending', 2931),
];

export default function OrdersTable({ setSelected, setOrder, setStatus }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Time</TableCell>
            <TableCell align="right">Delivery Adress</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Order Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.adress}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.method}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align='center'>
                <Chip
                    onClick={()=>{
                      setSelected('progress')
                      setOrder(row.order)
                      setStatus(row.status)
                    }}     
                    label={row.status} 
                    style={{color:row.status==='Completed'?'#37ae83':row.status==='Pending'?'#c9b65f':'#5265c7', background:row.status==='Completed'?'#def7ec':row.status==='Completed'?'#def7ec':row.status==='Pending'?'#f7edc1':'#9fadf5', border:row.status==='Completed'?'1px solid#37ae83':row.status==='Pending'?'1px solid #c9b65f':'1px solid #5265c7'}} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}