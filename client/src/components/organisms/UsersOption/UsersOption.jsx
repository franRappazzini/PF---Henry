import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import BanBtn from "../../atoms/BanBtn/BanBtn";
import LoadingBtn from "../../atoms/LoadingBtn/LoadingBtn";
import SearchBar2 from "../SearchBar2/SearchBar2";
import { getAllUsers } from "../../../redux/actions/userActions";
import style from "./UsersOption.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function UsersOption({ users }) {
  let [searchedUser, setSearchedUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function filteredUsers() {
    if (users.length) {
      if (searchedUser.length) {
        return users.filter(
          (user) =>
            user.given_name
              ?.toLowerCase()
              .includes(searchedUser.toLowerCase()) ||
            user.family_name
              ?.toLowerCase()
              .includes(searchedUser.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchedUser.toLowerCase())
        );
      } else return users;
    } else return [];
  }

  return (
    <div className={style.usersOptionContainer}>
      <div className={style.usersHeader}>Users</div>
      <div className={style.globalContainer}>
        <div className={style.searchBarContainer}>
          <SearchBar2
            className={style.searchBar}
            label="Search user"
            prodSearched={searchedUser}
            setProdSearched={setSearchedUser}
          />
        </div>
        <div className={style.gridContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Last name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Ban</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers().map((user, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="left">{user.given_name}</TableCell>
                    <TableCell align="left">{user.family_name}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">
                      <LoadingBtn user={user} />
                    </TableCell>
                    <TableCell align="left">status?</TableCell>
                    <TableCell align="left">
                      <BanBtn user={user} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
