import { Box, Checkbox, InputLabel } from "@mui/material";

import React from "react";

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
    <section>
      {categories.map((cat) => (
        <Box sx={{ display: "flex", alignItems: "center" }} key={cat}>
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
      ))}
    </section>
  );
}

export default SelectCategoryCreate;
