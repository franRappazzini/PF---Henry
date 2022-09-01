import React, { useState } from "react";
import { changeRole, getAllUsers } from "../../../redux/actions/userActions";

import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";

function LoadingBtn({ user }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const swal = withReactContent(Swal);

  async function handleClickRole(user, role) {
    setLoading(true);

    const res = await changeRole(user, role);
    if (res) {
      setLoading(false);
      return swal.fire("Error..", res.message, "error");
    }

    dispatch(getAllUsers());

    setLoading(false);
  }

  return (
    <LoadingButton
      title={user.isAdmin ? "Change to User" : "Change to Admin"}
      loading={loading}
      size="small"
      onClick={() => handleClickRole(user, !user.isAdmin)}
    >
      {user.isAdmin ? "Admin" : "User"}
    </LoadingButton>
  );
}

export default LoadingBtn;
