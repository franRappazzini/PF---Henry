import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import style from "./Profile.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-s5b8mmg6.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <main>
      {isAuthenticated ? (
        <section className={style.user_data_container}>
          <img src={user.picture} alt={user.name} />
          <p>{user.email}</p>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </section>
      ) : (
        <Button onClick={loginWithPopup}>Log In</Button>
      )}
    </main>
  );
}

export default Profile;
