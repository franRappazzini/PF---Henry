import { Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";

import { getCategories, loadCategory } from "../../../redux/actions/otherActions";
import style from "./SelectCategoryCreate.module.css";

function SelectCategoryCreate({ setSelectedCategories, selectedCategories }) {
  const { categories } = useSelector((state) => state.other);
  const [dialog, setDialog] = useState(false)
  const [category, setCategory] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, category]);

  function handleChange(e) {
    const { checked, value } = e.target;

    if (checked) setSelectedCategories([...selectedCategories, e.target.value]);
    else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  }

  function handleChangeInput(e) {
    setCategory(e.target.value)
  }


  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const handleOk = () => {
    if(category.length > 0){
      dispatch(loadCategory({category}))
      setCategory("")
      handleClose()
    }else{
      alert("Add a category!")
    }
  }

  return (
    <section className={style.checkbox_container}>
      <ul className={style.ul_category}>
        <span>Categories:</span>
        {categories.length > 0 &&
          categories.map((cat) => (
            <li key={cat.name}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id={cat.name}
                  value={cat.name}
                  color="secondary"
                  onChange={handleChange}
                />
                <InputLabel htmlFor={cat.name} variant="standard">
                  {cat.name}
                </InputLabel>
              </Box>
            </li>
          ))}
        <Button onClick={handleClickOpen}>Add category</Button>
        <Dialog open={dialog} onClose={handleClose}>
          <DialogContent>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <TextField
              label="Category"
              variant="standard"
              autoComplete="off"
              name="category"
              type="text"
              color="secondary"
              onChange={handleChangeInput}
            />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk}>Add</Button>
        </DialogActions>
        </Dialog>
      </ul>
    </section>
  );
}

export default SelectCategoryCreate;
