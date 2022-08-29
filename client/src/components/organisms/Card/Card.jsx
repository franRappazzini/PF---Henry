import {
  MdOutlineFavoriteBorder as F,
  MdOutlineAddShoppingCart as SC,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  SiAdidas,
  SiNewbalance,
  SiNike,
  SiPuma,
  SiReebok,
} from "react-icons/si";
import {
  addFavorites,
  addToCart,
  removeFavorites,
  removeFromCart,
} from "../../../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineEdit } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { RiCloseCircleLine } from "react-icons/ri";
import Select from "@mui/material/Select";
import SuccessSnackbar from "../SnackBar/SnackBar.jsx";
import { deleteProduct } from "../../../redux/actions/productActions.js";
import style from "./Card.module.css";

export default function Card({
  product,
  dashboard,
  handleConfirmationPopUpOpen,
}) {
  let dispatch = useDispatch();
  let { cartProducts } = useSelector((state) => state.product);
  let [open, setOpen] = useState(false);
  let [popUpOpen, setPopUpOpen] = useState(false);
  let [size, setSize] = useState();
  let [amount, setAmount] = useState(null);
  let [stock, setStock] = useState(0);
  let onCart = cartProducts.filter((prod) => prod.id === product.id).length;
  let [confirmationPopUpOpen, setConfirmationPopUpOpen] = useState(false);
  let [cart, setCart] = useState(onCart ? true : false);
  let ls = JSON.parse(localStorage.getItem("lsFavorites")) || [];
  let lsCart = JSON.parse(localStorage.getItem("lsCartProducts")) || [];
  const navigate = useNavigate();

  let checkFaved = () => {
    return ls.filter((fav) => fav.id === product.id).length;
  };

  let [fav, setFav] = useState(checkFaved() ? true : false);
  useEffect(() => {}, [fav]);

  let handleFav = () => {
    if (fav) {
      dispatch(removeFavorites(product.id));
      ls = ls.filter((prod) => prod.id !== product.id);
      localStorage.setItem("lsFavorites", JSON.stringify(ls));
      setFav((current) => !current);
      checkFaved() ? setOpen(false) : setOpen(true);
    } else {
      dispatch(addFavorites(product));
      ls.push(product);
      localStorage.setItem("lsFavorites", JSON.stringify(ls));
      setFav((current) => !current);
      checkFaved() ? setOpen(false) : setOpen(true);
    }
  };

  let handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let handleClickOpen = () => {
    setPopUpOpen(true);
  };

  let handlePopUpClose = () => {
    setPopUpOpen(false);
    setCart((current) => !current);
    setSize(null);
    setAmount(null);
  };

  let handleSize = (event) => {
    setSize(event.target.value);
    setStock(
      product.Sizes.filter((prod) => prod.size === event.target.value)[0]
        .Product_Size.stock
    );
  };
  let handleAmount = (event) => {
    setAmount(event.target.value);
  };

  let handleClickCart = () => {
    if (cart) {
      lsCart = lsCart.filter((prod) => prod.id !== product.id);
      localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart));
      dispatch(removeFromCart(product.id));
      setCart((current) => !current);
    } else {
      handleClickOpen();
      setCart((current) => !current);
    }
  };

  let handleAddToCart = () => {
    if (amount > 0 && size) {
      let prodToCart = {
        cartId: `${product.name}-${size}-${amount}`,
        id: product.id,
        Brand: product.Brand,
        Categories: product.Categories,
        image: product.image,
        name: product.name,
        price: product.price,
        choosedSize: size,
        choosedAmount: amount,
        Sizes: product.Sizes,
      };
      dispatch(addToCart(prodToCart));
      lsCart.push(prodToCart);
      localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart));
      handlePopUpClose();
    }
    return handlePopUpClose();
  };

  let handleClickOpenConfirmationPopUp = () => {
    setConfirmationPopUpOpen(true);
  };
  let handleClickCloseConfirmationPopUp = () => {
    setConfirmationPopUpOpen(false);
  };

  let handleRemove = () => {
    dispatch(deleteProduct(product.id));
    console.log("PRODUCT REMOVED SUCCESSFULLY:", product.id);
    handleClickCloseConfirmationPopUp();
  };

  let handleEdit = (id) => navigate(`/update/${id}`);

  let selectAmount = () => {
    let numbers = [];
    for (let i = 1; i <= stock; i++) {
      numbers.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return numbers;
  };

  return (
    <div className={style.container}>
      <ConfirmationPopUp
        confirmationOpen={confirmationPopUpOpen}
        handleClose={handleClickCloseConfirmationPopUp}
        handleOpen={handleClickOpenConfirmationPopUp}
        setConfirmationOpen={setConfirmationPopUpOpen}
        handleRemove={handleRemove}
        message="Remove Product"
        description="Are you sure you want to remove this product?"
      />
      <Dialog open={popUpOpen} onClose={handlePopUpClose}>
        <DialogTitle>Select Size</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 240 }}>
              <InputLabel>Sizes</InputLabel>
              <Select
                autoFocus
                value={size}
                onChange={handleSize}
                label="size"
                inputProps={{
                  name: "size",
                  id: "size",
                }}
              >
                <MenuItem value="none">None</MenuItem>
                {product.Sizes.map((s, i) => {
                  if (s.Product_Size.stock > 0) {
                    return (
                      <MenuItem key={i} value={s.size}>
                        {s.size}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 240 }}>
              <InputLabel>Amount</InputLabel>
              <Select
                autoFocus
                value={amount}
                onChange={handleAmount}
                label="amount"
                inputProps={{
                  name: "amount",
                  id: "amount",
                }}
              >
                <MenuItem value="0">0</MenuItem>
                {selectAmount()}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopUpClose}>Close</Button>
          <Button onClick={handleAddToCart}>Add</Button>
        </DialogActions>
      </Dialog>
      <SuccessSnackbar
        open={open}
        handleClose={handleClose}
        checkFaved={checkFaved}
        message="Product successfully added to favorites"
      />
      <div className={style.card}>
        <div className={style.header}>
          {product.Brand.name === "Nike" ? (
            <SiNike className={style.brand} />
          ) : product.Brand.name === "Adidas" ? (
            <SiAdidas className={style.brand} />
          ) : product.Brand.name === "Puma" ? (
            <SiPuma className={style.brand} />
          ) : product.Brand.name === "Reebok" ? (
            <SiReebok className={style.brand} />
          ) : product.Brand.name === "New Balance" ? (
            <SiNewbalance className={style.brand} />
          ) : (
            <BiError className={style.brand} />
          )}
          {dashboard ? (
            <RiCloseCircleLine
              className={style.iconoutline}
              onClick={() => handleClickOpenConfirmationPopUp()}
            />
          ) : (
            <F
              className={style.iconoutline}
              onClick={handleFav}
              style={{ color: fav ? "#5f27cd" : "#000" }}
            />
          )}
        </div>
        <div className={style.product}>
          <img
            src={product.image}
            alt="not found"
            className={product.Brand.name === "Reebok" ? style.img2 : style.img}
          />
        </div>
        <div className={style.info}>
          <div className={style.title}>{product.name}</div>
          <div className={style.price}>${product.price}</div>
        </div>
        <div className={style.details}>
          <Link to={`/product/${product.id}`} className={style.linkMore}>
            <button className={style.detailsButton}>View More</button>
          </Link>
          <button className={style.cartButton}>
            {!dashboard ? (
              <SC
                className={style.shoppingCart}
                onClick={handleClickCart}
                style={{ color: cart ? "#5f27cd" : "#000" }}
              />
            ) : (
              <AiOutlineEdit
                className={style.shoppingCart}
                onClick={() => handleEdit(product.id)}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
