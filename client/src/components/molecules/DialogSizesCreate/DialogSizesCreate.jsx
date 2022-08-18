import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { Box } from "@mui/system";

function DialogSizesCreate({ setSelectedSizes, selectedSizes }) {
  const [dialog, setDialog] = useState(false);
  const [options, setOptions] = useState({ size: "", stock: 0 });

  const sizes = [
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
  ];

  function handleOk() {
    console.log(options);

    const { size, stock } = options;
    if (size === "" || stock <= 0) {
      // TODO avisar que tiene que elegir talle y cant
      return;
    }

    setSelectedSizes([...selectedSizes, { ...options }]);
    setOptions({ size: "", stock: 0 });
    handleClose();
  }

  function handleChange(e) {
    setOptions({ ...options, [e.target.name]: e.target.value });
  }

  function handleClose() {
    setDialog(false);
  }

  function handleOpen() {
    setDialog(true);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Select Size</Button>
      <Dialog disableEscapeKeyDown open={dialog} onClose={handleClose}>
        <DialogTitle>Select Size</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label" variant="standard">
                Size
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                name="size"
                onChange={handleChange}
                value={options.size}
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Stock"
              variant="standard"
              autoComplete="off"
              name="stock"
              type="number"
              color="secondary"
              onChange={handleChange}
              value={options.stock}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSizesCreate;
