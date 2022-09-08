import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineFavoriteBorder as F, MdOutlineAddShoppingCart as SC } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SiAdidas, SiNewbalance, SiNike, SiPuma, SiReebok } from "react-icons/si";
import {
  addFavorites,
  addToCart,
  disableProduct,
  enableProduct,
  removeFavorites,
  removeFromCart,
} from "../../../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";

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
import { getAllProducts } from "../../../redux/actions/productActions";
import style from "./Card.module.css";

export default function Card({ product, dashboard, handleConfirmationPopUpOpen }) {
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
  let [message, setMessage] = useState("");
  let ls = JSON.parse(localStorage.getItem("lsFavorites")) || [];
  let lsCart = JSON.parse(localStorage.getItem("lsCartProducts")) || [];
  let off = product.isDisabled;
  const navigate = useNavigate();
  let isOnCart = lsCart.filter(prod=>prod.id===product.id).length?true:false

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
      checkFaved() ? setOpen(true) : setOpen(false);
    } else {
      dispatch(addFavorites(product));
      ls.push(product);
      localStorage.setItem("lsFavorites", JSON.stringify(ls));
      setFav((current) => !current);
      checkFaved() ? setOpen(true) : setOpen(false);
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
      product.Sizes.filter((prod) => prod.size === event.target.value)[0].Product_Size.stock
    );
  };
  let handleAmount = (event) => {
    setAmount(event.target.value);
  };

  let handleClickCart = () => {
    if (isOnCart) {
      // console.log('size from handleClickCart',size);
      // lsCart = lsCart.filter((prod) => prod.id !== product.id);
      // localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart));
      // dispatch(removeFromCart(`${product.name}-${product.Sizes.find((s) => s.size === size)}`));
      // setCart((current) => !current);
    } else {
      handleClickOpen();
      setCart((current) => !current);
    }
  };

  let handleAddToCart = () => {
    if (amount > 0 && size) {
      let prodToCart = {
        cartId: `${product.name}-${size}`,
        id: product.id,
        Brand: product.Brand,
        Categories: product.Categories,
        image: product.image,
        name: product.name,
        price: product.price,
        choosedSize: product.Sizes.find((s) => s.size === size),
        choosedAmount: amount,
        Sizes: product.Sizes,
        idRemove: `${product.name}-${product.Sizes.find((s) => s.size === size).size}`,
      };
      console.log(prodToCart);
      dispatch(addToCart(prodToCart));
      lsCart.push(prodToCart);
      localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart));
      handlePopUpClose();
    }
    return handlePopUpClose();
  };

  let handleClickOpenConfirmationPopUp = (status) => {
    if (status === "Disable") {
      setMessage(status);
      setConfirmationPopUpOpen(true);
    }
    setMessage(status);
    setConfirmationPopUpOpen(true);
  };
  let handleClickCloseConfirmationPopUp = () => {
    setConfirmationPopUpOpen(false);
  };

  let handleDisableProduct = () => {
    dispatch(disableProduct(product.id));
    dispatch(getAllProducts());
    handleClickCloseConfirmationPopUp();
  };

  let handleEdit = (id) => navigate(`/update/${id}`);

  let handleEnableProduct = () => {
    dispatch(enableProduct(product.id));
    dispatch(getAllProducts());
    handleClickCloseConfirmationPopUp();
  };

  // const handleUnCart = () => {
  //   const newCart = lsCartProducts.filter(
  //     (prod) => prod.idRemove !== product.idRemove
  //   );
  //   dispatch(
  //     removeFromCart(product.cartId)
  //   );
  //   localStorage.setItem("lsCartProducts", JSON.stringify(newCart));
  //   setLsCartProducts(newCart);
  // };

  let selectAmount = () => {
    let numbers = [];
    for (let i = 1; i <= stock; i++) {
      numbers.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return numbers;
  };

  return (
    <div
      className={
        off && !dashboard
          ? style.disabled
          : off && dashboard
          ? style.disabled
          : style.container
      }
    >
      <ConfirmationPopUp
        confirmationOpen={confirmationPopUpOpen}
        handleClose={handleClickCloseConfirmationPopUp}
        handleOpen={handleClickOpenConfirmationPopUp}
        setConfirmationOpen={setConfirmationPopUpOpen}
        action={message}
        handleDisable={handleDisableProduct}
        handleEnable={handleEnableProduct}
        message={`${message} Product`}
        description={`Are you sure you want to ${message.toLocaleLowerCase()} this product?`}
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
                {product.Sizes.map((s) => {
                  if (s.Product_Size.stock > 0) {
                    return (
                      <MenuItem key={s.size} value={s.size}>
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
                value={amount}
                onChange={handleAmount}
                label="amount"
                inputProps={{
                  name: "amount",
                  id: "amount",
                }}
              >
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
          {product.Brand?.name === "Nike" ? (
            <SiNike className={style.brand} />
          ) : product.Brand?.name === "Adidas" ? (
            <SiAdidas className={style.brand} />
          ) : product.Brand?.name === "Puma" ? (
            <SiPuma className={style.brand} />
          ) : product.Brand?.name === "Reebok" ? (
            <SiReebok className={style.brand} />
          ) : product.Brand?.name === "New Balance" ? (
            <SiNewbalance className={style.brand} />
          ) : (
            <BiError className={style.brand} />
          )}
          {dashboard && !off ? (
            <RiCloseCircleLine
              className={style.iconoutline}
              onClick={() => handleClickOpenConfirmationPopUp("Disable")}
            />
          ) : dashboard && off ? (
            <AiOutlineCheckCircle
              className={style.iconoutline}
              onClick={() => handleClickOpenConfirmationPopUp("Enable")}
            />
          ) : (
            <F
              className={style.iconoutline}
              onClick={handleFav}
              style={{ color: fav ? "#5f27cd" : "#000", pointerEvents: off&&!dashboard? 'none' : 'auto'}}
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
          <Link
            to={`/product/${product.id}`}
            className={style.linkMore}
            style={{ pointerEvents: off && dashboard ? "none" : "auto" }}
          >
            <button className={style.detailsButton}>View More</button>
          </Link>
          <button className={style.cartButton}>
            {!dashboard ? (
              <Link to={isOnCart?'/cart':'/'} style={{textDecoration: 'none'}}>
                <SC
                  className={style.shoppingCart}
                  onClick={handleClickCart}
                  style={{ color: isOnCart ? "#5f27cd" : "#000",pointerEvents: off&&!dashboard? 'none' : 'auto' }}
                />
              </Link>
            ) : (
              <AiOutlineEdit
                className={style.shoppingCart}
                onClick={() => handleEdit(product.id)}
                style={{ pointerEvents: off && dashboard ? "none" : "auto" }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
