import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./ProfileForm.module.css";
import { updateUser } from "../../../redux/actions/userActions";
import withReactContent from "sweetalert2-react-content";

function ProfileForm({ logedUser, setEdit }) {
  const instanceForm = {
    picture: "",
    given_name: logedUser.given_name || "",
    family_name: logedUser.family_name || "",
    email: logedUser.email || "",
    password: "",
  };
  const [form, setForm] = useState(instanceForm);
  const [loading, setLoading] = useState(false);
  const swal = withReactContent(Swal);

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) return swal.fire("Error..", validate(), "error");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", form.picture);
      formData.append("upload_preset", "gsx0rfx1");
      const imgRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dnwamkq58/upload",
        formData
      );

      const user = {
        ...form,
        picture: imgRes.data.url,
        currentEmail: logedUser.email,
      };
      await updateUser(user);
    } catch (err) {
      setLoading(false);
      return swal.fire("Error..", err.message, "error");
    }

    swal.fire("Success!", "User update!", "success");
    setForm(instanceForm);
    setLoading(false);
    setEdit(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeImage(e) {
    setForm({ ...form, picture: e.target.files[0] });
  }

  function validate() {
    const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (form.picture === "") return "Image error";
    if (form.given_name === "") return "Name error";
    if (form.family_name === "") return "Last name error";
    if (!form.email.match(reEmail)) return "Email error";
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <form className={style.form_profile} onSubmit={handleSubmit}>
          <TextField
            type="file"
            label="Image"
            variant="standard"
            autoComplete="off"
            name="image"
            onChange={handleChangeImage}
            required
          />

          <TextField
            type="text"
            label="Name"
            variant="standard"
            autoComplete="off"
            name="given_name"
            placeholder={logedUser.given_name}
            onChange={handleChange}
            value={form.given_name}
            required
          />

          <TextField
            type="text"
            label="Last name"
            variant="standard"
            autoComplete="off"
            name="family_name"
            placeholder={logedUser.family_name}
            onChange={handleChange}
            value={form.family_name}
            required
          />

          <TextField
            type="email"
            label="Email"
            variant="standard"
            autoComplete="off"
            name="email"
            placeholder={logedUser.email}
            onChange={handleChange}
            value={form.email}
            required
          />

          <Typography fontSize={14} sx={{ marginTop: "1rem", width: 275 }}>
            *To change the password you must select 'Don't remember your
            password?' in Log In
          </Typography>

          <div className={style.btns_container}>
            <LoadingButton loading={loading} type="submit" variant="outlined">
              Submit
            </LoadingButton>
            <Button color="error" size="small" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProfileForm;
