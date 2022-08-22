import { Button } from "@mui/material";
import React from "react";
import style from "./Profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { isAuthenticated, loginWithPopup, user } = useAuth0();

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
