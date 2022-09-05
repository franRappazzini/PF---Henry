import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBrands, getCategories } from "../../../redux/actions/otherActions";
import { useDispatch, useSelector } from "react-redux";

import { BiError } from "react-icons/bi";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { LoadingButton } from "@mui/lab";
import { SiAdidas } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";
import { SiNike } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { SiReebok } from "react-icons/si";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./FormUpdateProduct.module.css";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

export default function ProductContainer({ productDetail }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const swal = withReactContent(Swal);

  const instanceProduct = {
    name: productDetail.name,
    brand: productDetail.Brand.name,
    image: productDetail.image,
    price: productDetail.price,
    categories: productDetail.Categories,
    sizes: productDetail.Sizes,
    newSizes: [],
    newCategories: [],
    newImage: "",
  };
  const [product, setProduct] = useState(instanceProduct);
  const [sizeAdded, setSizeAdded] = useState({ size: 0, stock: 0 });
  const [dialog, setDialog] = useState(false);
  const [dialogCat, setDialogCat] = useState(false);
  const [category, setCategory] = useState("");
  const [newCategories, setNewCategories] = useState([]);

  const { brands } = useSelector((state) => state.other);
  const { categories } = useSelector((state) => state.other);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  function validations() {
    if (!product.name.length) return "Put a name.";
    if (product.brand === "") return "You must choose a brand.";
    if (product.price <= 0) return "Price must be greater than $0";
    if (!product.categories.length && !product.newCategories.length)
      return "You must choose at least one category.";
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //Categories
  const handleCategory = (e) => {
    let auxCat = product.categories.map((e) => e.name);
    e.preventDefault();
    if (
      product.newCategories.includes(e.target.value.name) ||
      product.categories.includes(e.target.value.name) ||
      auxCat.includes(e.target.value.name)
    ) {
      alert("The product has this category");
    } else {
      setProduct({
        ...product,
        newCategories: [
          ...product.newCategories,
          e.target.value.name || e.target.value,
        ],
      });
    }
  };

  const handleDeleteCategories = (e) => {
    if (product.newCategories.includes(e)) {
      setProduct({
        ...product,
        newCategories: product.newCategories.filter((cat) => cat !== e),
      });
    } else {
      setProduct({
        ...product,
        categories: product.categories.filter((cat) => cat.name !== e),
      });
    }
  };

  const handleCatOpen = () => {
    setDialogCat(true);
  };

  const handleCatClose = () => {
    setDialogCat(false);
  };

  const handleCatOk = () => {
    if (category.length > 0) {
      setNewCategories([...newCategories, category]);
      setCategory("");
      handleCatClose();
    } else {
      alert("Add a category!");
    }
  };

  const handleChangeInput = (e) => {
    setCategory(e.target.value);
  };

  // Image
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);

      setProduct({
        ...product,
        image: image,
        newImage: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        image: productDetail.image,
        newImage: "",
      });
    }
  };

  const handleDeleteImage = () => {
    setProduct({
      ...product,
      image: productDetail.image,
      newImage: "",
    });
  };

  //Sizes
  function handleClose() {
    setDialog(false);
  }

  function handleOpen() {
    setDialog(true);
  }

  const handleChangeSize = (e) => {
    const sizeAux = product.sizes;

    let index = sizeAux.findIndex((obj) => {
      return obj.size === e.target.name;
    });

    sizeAux[index].Product_Size.stock = e.target.value;

    setProduct({
      ...product,
      sizes: sizeAux,
    });
  };

  const handleChangeNewSize = (e) => {
    const sizeAux = product.newSizes;

    let index = sizeAux.findIndex((obj) => {
      return obj.size === e.target.name;
    });

    sizeAux[index].stock = e.target.value;

    setProduct({
      ...product,
      newSizes: sizeAux,
    });
  };

  const handleChangeAddedSize = (e) => {
    setSizeAdded({ ...sizeAdded, [e.target.name]: Number(e.target.value) });
  };

  const handleOk = () => {
    let sizesNumber = product.sizes.map((s) => s.size);
    product.newSizes.map((s) => sizesNumber.push(s.size));
    let productSizes = product.newSizes;

    if (sizesNumber.includes(Number(sizeAdded.size))) {
      return alert("Ese talle ya existe");
    } else {
      productSizes.push(sizeAdded);
      setProduct({ ...product, newSizes: productSizes });
      handleClose();
    }
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateProduct = {};

    if (validations()) return swal.fire("Error..", validations(), "error");

    setLoading(true);

    updateProduct = { ...product };

    try {
      if (product.newImage !== "") {
        const formData = new FormData();
        formData.append("file", product.newImage);
        formData.append("upload_preset", "mo6d6qav");
        const imgRes = await axios.post(
          "https://api.cloudinary.com/v1_1/ddtxgnllz/upload",
          formData
        );

        updateProduct.image = imgRes.data.url;
      }

      await axios.put("/product/" + productDetail.id, updateProduct);
    } catch (err) {
      swal.fire("Error..", err.message, "error");
    }

    setLoading(false);
  };

  if (productDetail) {
    return (
      <div className={style.product_container}>
        <div className={style.left_side}>
          <div className={style.top_left_container}>
            {product.brand === "Nike" ? (
              <SiNike className={style.brand_icon} size={40} />
            ) : product.brand === "Adidas" ? (
              <SiAdidas className={style.brand_icon} size={40} />
            ) : product.brand === "Puma" ? (
              <SiPuma className={style.brand_icon} size={40} />
            ) : product.brand === "Reebok" ? (
              <SiReebok className={style.brand_icon} size={40} />
            ) : product.brand === "New Balance" ? (
              <SiNewbalance className={style.brand_icon} size={40} />
            ) : (
              <BiError className={style.brand_icon} size={40} />
            )}
          </div>
          <img className={style.product_img} src={product.image} alt="" />
        </div>

        <div className={style.right_side}>
          {/* Nombre */}
          <form className={style.form}>
            <TextField
              label={productDetail.name}
              variant="standard"
              autoComplete="off"
              name="name"
              color="secondary"
              onChange={handleChange}
              value={product.name}
              required
            />

            {/* Marca */}
            <TextField
              label={productDetail.Brand.name}
              select
              variant="standard"
              color="secondary"
              sx={{ minWidth: 100 }}
              name="brand"
              onChange={handleChange}
              value={product.brand}
              required
            >
              {brands.length > 0 &&
                brands.map((brand) => (
                  <MenuItem key={brand.name} value={brand.name}>
                    {brand.name}
                  </MenuItem>
                ))}
            </TextField>

            {/* Precio */}
            <TextField
              label={productDetail.price}
              variant="standard"
              autoComplete="off"
              name="price"
              type="number"
              color="secondary"
              onChange={handleChange}
              value={product.price}
              required
            />

            {/* Imagen */}
            <div>
              <TextField
                label="Image"
                variant="standard"
                autoComplete="off"
                // name="image"
                type="file"
                color="secondary"
                onChange={handleImageChange}
                style={{ width: 500 }}
                required
              />
              {product.newImage ? (
                <IconButton
                  onClick={handleDeleteImage}
                  className={style.delete_button}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              ) : null}
            </div>

            {/* Categorias */}
            <div className={style.categories}>
              <TextField
                label="Categories"
                select
                variant="standard"
                color="secondary"
                sx={{ minWidth: 100 }}
                name="category"
                onChange={handleCategory}
                value={product.newCategories}
                required
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <MenuItem key={category.name} value={category}>
                      {category.name}
                    </MenuItem>
                  ))}
                {newCategories.length > 0 &&
                  newCategories.map((cat) => (
                    <MenuItem key={cat} value={{ name: cat }}>
                      {cat}
                    </MenuItem>
                  ))}
              </TextField>

              {/* ADD CATEGORY */}
              <Button onClick={handleCatOpen}>Add category</Button>
              <Dialog open={dialogCat} onClose={handleCatClose}>
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
                  <Button onClick={handleCatClose}>Cancel</Button>
                  <Button onClick={handleCatOk}>Add</Button>
                </DialogActions>
              </Dialog>

              <div className={style.mapCat}>
                {/* OLD CAT */}
                {product.categories.map((cat) => (
                  <p className={style.pCat}>
                    {cat.name}
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDeleteCategories(cat.name)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </p>
                ))}
                {/* NEW CAT */}
                {product.newCategories.map((cat) => (
                  <p className={style.pCat}>
                    {cat}
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDeleteCategories(cat)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </p>
                ))}
              </div>
            </div>

            {/* Sizes add*/}
            <Button sx={{ marginTop: "1rem" }} onClick={handleOpen}>
              Add extra size
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
                    <InputLabel
                      id="demo-dialog-select-label"
                      variant="standard"
                    >
                      Size
                    </InputLabel>
                    <TextField
                      variant="standard"
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      type="number"
                      name="size"
                      onChange={handleChangeAddedSize}
                    />
                  </FormControl>

                  <TextField
                    label="Stock"
                    variant="standard"
                    autoComplete="off"
                    name="stock"
                    type="number"
                    color="secondary"
                    onChange={handleChangeAddedSize}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOk}>Ok</Button>
              </DialogActions>
            </Dialog>

            {/* Sizes change */}
            <div className={style.sizes}>
              {product.sizes.map((size) => (
                <div className={style.sizesDiv} key={size.size}>
                  <p>Size: {size.size}</p>
                  <TextField
                    label="Stock"
                    variant="standard"
                    name={size.size}
                    type="number"
                    color="secondary"
                    sx={{
                      maxWidth: 40,
                    }}
                    onChange={handleChangeSize}
                    value={size.Product_Size.stock}
                    required
                  />
                </div>
              ))}
              {product.newSizes.map((size) => (
                <div className={style.sizesDiv}>
                  <p>Size: {size.size}</p>
                  <TextField
                    label="Stock"
                    variant="standard"
                    name={size.size}
                    type="number"
                    color="secondary"
                    sx={{
                      maxWidth: 40,
                    }}
                    onChange={handleChangeNewSize}
                    value={size.stock}
                    required
                  />
                </div>
              ))}
            </div>

            <Box sx={{ display: "flex" }}>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleSubmit}
                sx={{ marginRight: "1rem" }}
              >
                Save
              </LoadingButton>
              <Button onClick={() => navigate(`/product/${productDetail.id}`)}>
                View product
              </Button>
            </Box>
          </form>
        </div>
      </div>
    );
  }
}
