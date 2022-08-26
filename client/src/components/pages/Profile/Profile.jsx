import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import React from "react";
import { getLogedUser } from "../../../redux/actions/userActions";
import style from "./Profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Profile() {
  const { isAuthenticated, loginWithPopup, user, isLoading } = useAuth0();
  const { logedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated && dispatch(getLogedUser(user));
  }, [dispatch, isAuthenticated, user]);

  if (isLoading) return <p>Loading...</p>;

  isAuthenticated && console.log(logedUser);

  return (
    <main>
      {isAuthenticated ? (
        <section className={style.user_data_container}>
          <img src={user.picture} alt={user.name} />
          <p>{user.email}</p>
        </section>
      ) : (
        <Button onClick={loginWithPopup}>Log In</Button>
      )}
    </main>
  );
}

export default Profile;
