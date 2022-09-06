import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';



export default function OrdersTable({ setSelected, setOrder, setStatus, rows}) {
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
              <TableCell align="right">NONE</TableCell>
              <TableCell align="right">NONE</TableCell>
              <TableCell align="right">Mercado Pago</TableCell>
              <TableCell align="right">{row.finalPrice}$</TableCell>
              <TableCell align='center'>
                <Chip
                    onClick={()=>{
                      setSelected('progress')
                      setOrder(row.id)
                      setStatus(row.state)
                    }}     
                    label={row.state} 
                    style={{color:row.state==='Completed'?'#37ae83':row.state==='Pending'?'#c9b65f':'#5265c7', background:row.state==='Completed'?'#def7ec':row.state==='Completed'?'#def7ec':row.state==='Pending'?'#f7edc1':'#9fadf5', border:row.state==='Completed'?'1px solid#37ae83':row.state==='Pending'?'1px solid #c9b65f':'1px solid #5265c7'}} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}