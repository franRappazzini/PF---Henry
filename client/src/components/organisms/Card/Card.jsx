import React, { useState, useEffect } from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom'
import { MdOutlineFavoriteBorder as F, MdOutlineAddShoppingCart as SC} from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { BiError } from 'react-icons/bi';
import { addFavorites, removeFavorites, removeFromCart, addToCart} from '../../../redux/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import SuccessSnackbar from '../SnackBar/SnackBar.jsx'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';
import { deleteProduct } from '../../../redux/actions/productActions.js';

export default function Card({ product, dashboard, handleConfirmationPopUpOpen}) {
    let dispatch = useDispatch()
    let { cartProducts } = useSelector((state) => state.product) 
    let [open, setOpen] = useState(false)
    let [popUpOpen, setPopUpOpen] = useState(false)
    let [size, setSize] = useState()
    let [amount, setAmount] = useState(null)
    let [stock, setStock] = useState(0)
    let onCart = cartProducts.filter(prod=>prod.id===product.id).length
    let [confirmationPopUpOpen, setConfirmationPopUpOpen] = useState(false)
    let [cart, setCart] = useState(onCart?true:false)  
    let ls = JSON.parse(localStorage.getItem('lsFavorites')) || []
    let lsCart = JSON.parse(localStorage.getItem('lsCartProducts')) || []

    let checkFaved = () => {
       return ls.filter(fav=>fav.id===product.id).length
    };
    
    let [fav, setFav] = useState(checkFaved()?true:false)
    useEffect(()=>{
    },[fav])

    let handleFav = () => {
        if (fav) {
            dispatch(removeFavorites(product.id))
            ls=ls.filter(prod=>prod.id!==product.id)
            localStorage.setItem('lsFavorites', JSON.stringify(ls))
            setFav(current => !current)
            checkFaved()?setOpen(false):setOpen(true)                                                        
        } else {
            dispatch(addFavorites(product))
            ls.push(product)
            localStorage.setItem('lsFavorites', JSON.stringify(ls))
            setFav(current => !current)
            checkFaved()?setOpen(false):setOpen(true)  
        }       
    };

    let handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }    
        setOpen(false)
    };

    let handleClickOpen = () => {
        setPopUpOpen(true)
    }; 

    let handlePopUpClose = () => {
        setPopUpOpen(false)
        setCart(current => !current)
        setSize(null)
        setAmount(null)
    }; 

    let handleSize = (event) => {
        setSize(event.target.value)
        setStock(product.Sizes.filter(prod=>prod.size===event.target.value)[0].Product_Size.stock);
    };
    let handleAmount = (event) => {
        setAmount(event.target.value)
    };

    let handleClickCart = () => {
        if (cart) {
            lsCart = lsCart.filter(prod=>prod.id!==product.id)
            localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart))
            dispatch(removeFromCart(product.id))
            setCart(current => !current)
        } else {
            handleClickOpen() 
            setCart(current => !current)
        }
    };

    let handleAddToCart =  () => {
        if (amount>0&&size){
            let prodToCart= {
                cartId:`${product.name}-${size}-${amount}`,
                id:product.id,
                Brand:product.Brand,
                Categories:product.Categories,
                image:product.image,
                name:product.name,
                price: product.price,
                choosedSize:size,
                choosedAmount:amount,
                Sizes:product.Sizes
              }
            dispatch(addToCart(prodToCart))
            lsCart.push(prodToCart)
            localStorage.setItem(`lsCartProducts`, JSON.stringify(lsCart))
            handlePopUpClose()
        }
        return handlePopUpClose()
    };

    let handleClickOpenConfirmationPopUp = () => {
        setConfirmationPopUpOpen(true)
    };
    let handleClickCloseConfirmationPopUp = () => {
        setConfirmationPopUpOpen(false)
    };

    let handleRemove = () => {
        dispatch(deleteProduct(product.id))
        console.log('PRODUCT REMOVED SUCCESSFULLY:', product.id);
        handleClickCloseConfirmationPopUp()
    };

    let handleEdit = (id) => {

    };
    
    let selectAmount =  () => {
        let numbers = []
         for (let i = 1; i <= stock; i++) { 
            numbers.push(<MenuItem value={i}>{i}</MenuItem>) 
        }
        return numbers
=======
import {
  MdOutlineFavoriteBorder as F,
  MdOutlineAddShoppingCart as SC,
} from "react-icons/md";
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
import { Link } from "react-router-dom";
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

  let checkFaved = () => {
    return ls.filter((fav) => fav.id === product.id).length;
  };

  let [fav, setFav] = useState(checkFaved() ? true : false);
  useEffect(() => {}, [fav]);

  let handleFav = () => {
    if (fav) {
      // dispatch(removeFavorites(product.id))
      ls = ls.filter((prod) => prod.id !== product.id);
      localStorage.setItem("lsFavorites", JSON.stringify(ls));
      setFav((current) => !current);
      checkFaved() ? setOpen(false) : setOpen(true);
    } else {
      // dispatch(addFavorites(product))
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
      dispatch(removeFromCart(product.id));
      setCart((current) => !current);
    } else {
      handleClickOpen();
      setCart((current) => !current);