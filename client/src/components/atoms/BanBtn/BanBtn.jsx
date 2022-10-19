import React, { useState } from "react";
import { banUser, getAllUsers } from "../../../redux/actions/userActions";

import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";

function BanBtn({ user }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const swal = withReactContent(Swal);

  async function handleClickBan(user, ban) {
    setLoading(true);

    const res = await banUser(user, ban);
    if (res) {
      setLoading(false);
      return swal.fire("Error..", res.message, "error");
    }

    dispatch(getAllUsers());

    setLoading(false);
  }

  return (
    <LoadingButton
      title={user.isBanned ? "Unban" : "BAN"}
      loading={loading}
      size="small"
      color="error"
      variant={user.isBanned ? "text" : "contained"}
      onClick={() => handleClickBan(user, !user.isBanned)}
    >
      {user.isBanned ? "Unban" : "Ban"}
    </LoadingButton>
  );
}

export default BanBtn;
