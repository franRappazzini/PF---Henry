import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Clear } from "@mui/icons-material";
import { getSizes } from "../../../redux/actions/otherActions";
import style from "./DialogSizesCreate.module.css";

function DialogSizesCreate({ setSelectedSizes, selectedSizes }) {
  const [dialog, setDialog] = useState(false);
  const [options, setOptions] = useState({ size: "", stock: 0 });
  const { sizes } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  function handleOk() {
    console.log(options);

    const { size, stock } = options;
    if (size === "" || stock <= 0) {
      // TODO avisar que tiene que elegir talle y cant
      return;
    }

    const findSize = selectedSizes.find((s) => s.size === size);
    if (findSize) findSize.stock = parseInt(findSize.stock) + parseInt(stock);
    else setSelectedSizes([...selectedSizes, { ...options }]);

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

  function handleDelete(size) {
    setSelectedSizes(selectedSizes.filter((s) => s.size !== size));
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ marginTop: "1rem" }}>
        Select Size
      </Button>
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
                {sizes.length > 0 &&
                  sizes.map((size) => (
                    <MenuItem key={size.size} value={size.size}>
                      {size.size}
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

      <section>
        {selectedSizes.length > 0 && (
          <>
            <ul className={style.ul_size}>
              {selectedSizes.map((size, i) => (
                <li key={i} className={style.li_size}>
                  Size: {size.size} x {size.stock}
                  <IconButton
                    aria-label="delete"
                    id={`${size.size}-${size.stock}`}
                    onClick={() => handleDelete(size.size, size.stock)}
                  >
                    <Clear color="error" />
                  </IconButton>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

export default DialogSizesCreate;
