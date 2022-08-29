import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import ProfileCard from "../../molecules/ProfileCard/ProfileCard";
import ProfileForm from "../../molecules/ProfileForm/ProfileForm";
import { getLogedUser } from "../../../redux/actions/userActions";
import style from "./Profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Profile() {
  const { isAuthenticated, loginWithPopup, user, isLoading } = useAuth0();
  const { logedUser } = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated && dispatch(getLogedUser(user));
  }, [dispatch, isAuthenticated, user, edit]);

  if (isLoading) return <p>Loading...</p>;

  isAuthenticated && console.log(logedUser);

  return (
    <main className={style.profile_container}>
      {isAuthenticated && logedUser.email ? (
        !edit ? (
          <ProfileCard user={user} logedUser={logedUser} setEdit={setEdit} />
        ) : (
          <ProfileForm logedUser={logedUser} setEdit={setEdit} />
        )
      ) : (
        <Button onClick={loginWithPopup}>Log In</Button>
      )}
    </main>
  );
}

export default Profile;
