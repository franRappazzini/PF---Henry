import { Box, Checkbox, InputLabel } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../../../redux/actions/otherActions";
import style from "./SelectCategoryCreate.module.css";

function SelectCategoryCreate({ setSelectedCategories, selectedCategories }) {
  const { categories } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleChange(e) {
    const { checked, value } = e.target;

    if (checked) setSelectedCategories([...selectedCategories, e.target.value]);
    else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
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
      </ul>
    </section>
  );
}

export default SelectCategoryCreate;
