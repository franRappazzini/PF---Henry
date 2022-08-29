import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import style from './UsersOption.module.css'
import SearchBar2 from '../SearchBar2/SearchBar2';

export default function UsersOption({users}) {
  
  let [searchedUser, setSearchedUser] = useState('')

  useEffect(()=>{
  }, [searchedUser])

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
  function filteredUsers() {
    if (users.length) {
      if (searchedUser.length) {
        return users.filter((user) =>
          user.given_name?.toLowerCase().includes(searchedUser.toLowerCase()) || user.family_name?.toLowerCase().includes(searchedUser.toLowerCase())
        );
      } else return users;
    } else return [];
  }
  const rows = filteredUsers().map(user=> {return {id:user.id, firstName:user.given_name,email: user.email ,lastName:user.family_name, type:user.isAdmin?'Admin':'User', status: 'Active'}})
  
    return (
        <div className={style.usersOptionContainer}>
          <div className={style.usersHeader}>
            Users
          </div>
          <div className={style.globalContainer} >

            <div className={style.searchBarContainer}>
              <SearchBar2 className={style.searchBar} label='Search user' prodSearched={searchedUser} setProdSearched={setSearchedUser}/> 
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
