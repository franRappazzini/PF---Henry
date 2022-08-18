import { Box, Checkbox, InputLabel } from "@mui/material";

import React from "react";
import style from "./SelectCategoryCreate.module.css";

function SelectCategoryCreate({ setSelectedCategories, selectedCategories }) {
  const categories = ["Urban", "Training and Fitness", "Running", "Unisex"];

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
        {categories.map((cat) => (
          <li key={cat}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                id={cat}
                value={cat}
                color="secondary"
                onChange={handleChange}
              />
              <InputLabel htmlFor={cat} variant="standard">
                {cat}
              </InputLabel>
            </Box>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SelectCategoryCreate;
