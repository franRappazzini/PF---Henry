import { Box, Button, Card, CardActions, CardContent } from "@mui/material";

import React from "react";
import style from "./ProfileCard.module.css";

function ProfileCard({ user, logedUser, setEdit }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className={style.img_profile}
            src={logedUser.picture || user.picture}
            alt={logedUser.given_name}
          />
        </Box>

        {logedUser.given_name ? (
          <p>{logedUser.given_name}</p>
        ) : (
          <p>Complete name</p>
        )}
        {logedUser.family_name ? (
          <p>{logedUser.family_name}</p>
        ) : (
          <p>Complete last name</p>
        )}
        <p>{logedUser.email}</p>
      </CardContent>
      {!logedUser.isSocial && (
        <CardActions>
          <Button size="small" onClick={() => setEdit(true)}>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ProfileCard;
