import { Button } from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  return (
    <main>
      {isAuthenticated ? (
        <p>hola</p>
      ) : (
        <Button onClick={loginWithPopup}>Log In</Button>
      )}
    </main>
  );
}

export default Profile;
