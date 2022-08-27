import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import style from './UsersOption.module.css'
import SearchBar2 from '../SearchBar2/SearchBar2';
import { ClassNames } from '@emotion/react';
import Divider from '@mui/material/Divider';


  

export default function UsersOption({users}) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'firstName', headerName: 'First name', width: 110 },
        { field: 'lastName', headerName: 'Last name', width: 110 },
        {
          field: 'email',
          headerName: 'Email',
          type: 'text',
          width: 200,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'text',
            width: 80,
          },
        {
            field: 'status',
            headerName: 'Status',
            type: 'text',
            width: 90,
          },
      ];
      console.log('users from UsersOption:', users);
      
      const rows = users.map(user=> {return {id:user.id, firstName:user.given_name,email: user.email ,lastName:user.family_name, type:user.isAdmin?'Admin':'User', status: 'Active'}})
    return (
        <div className={style.usersOptionContainer}>
          <div className={style.usersHeader}>
            Users
          </div>
          <div className={style.globalContainer} >

            <div className={style.searchBarContainer}>
              <SearchBar2 className={style.searchBar} label='Search user'/> 
            </div>                 
            <div className={style.gridContainer}>
              <DataGrid
                className={style.grid}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      );
}
