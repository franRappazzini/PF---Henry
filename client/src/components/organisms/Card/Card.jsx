import React, { useState } from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom'
import { MdOutlineFavoriteBorder as F, MdOutlineAddShoppingCart as SC} from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { BiError } from 'react-icons/bi';
import { addFavorites, removeFavorites} from '../../../redux/actions/productActions.js';
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

export default function Card({product}) {
    let dispatch = useDispatch()
    let [open, setOpen] = useState(false)
    let [popUpOpen, setPopUpOpen] = useState(false)
    let [size, setSize] = useState()
    let [cart, setCart] = useState(false)    
    let { favorites } = useSelector((state) => state.product) 

    let checkFaved = () => {
       return favorites.filter(fav=>fav.id===product.id).length
    };
    
    let [fav, setFav] = useState(checkFaved()?true:false)

    let handleFav = () => {        
        fav ? dispatch(removeFavorites(product.id)) : dispatch(addFavorites(product))
        checkFaved()?setOpen(false):setOpen(true)
        setFav(current => !current)         
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
    }; 

    let handleSize = (event) => {
        setSize(
          event.target.value,
        )
    }; 

    let handleClickCart = () => {
        handleClickOpen()
        setCart(current => !current)
    };

    let handleAddToCart = () => {

    };
        
  return (
        <div className={style.container}>
            <Dialog
                open={popUpOpen}
                onClose={handlePopUpClose}
            >
            <DialogTitle>Select Size</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
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
                                name: 'size',
                                id: 'size',
                                }}
                        >
                            <MenuItem value=''>None</MenuItem>
                            {product.Sizes.map(s=><MenuItem value={s.size}>{s.size}</MenuItem>)}
                        </Select>
                    </FormControl>

                 </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePopUpClose}>Close</Button>
                <Button onClick={handleAddToCart}>Add</Button>
            </DialogActions>
            </Dialog>
            <SuccessSnackbar open={open} handleClose={handleClose} checkFaved={checkFaved} message='Product successfully added to favorites'/>           
            <div className={style.card}>
            <div className={style.header}>
                {
                product.Brand.name==='Nike' 
                ? <SiNike className={style.brand}/> 
                : product.Brand.name==='Adidas' 
                ? <SiAdidas className={style.brand}/> 
                : product.Brand.name==='Puma' 
                ? <SiPuma className={style.brand}/> 
                : product.Brand.name==='Reebok' 
                ? <SiReebok className={style.brand}/> 
                : product.Brand.name==='New Balance' 
                ? <SiNewbalance className={style.brand}/> 
                : <BiError className={style.brand}/>
                }
                <F className={style.iconoutline} onClick={handleFav} style={{color: fav ? '#5f27cd' : '#000'}}/>
            </div>            
                <div className={style.product}>
                    <img src={product.image} alt= 'not found' className={product.Brand.name==='Reebok'? style.img2 : style.img}/>
                </div>  
                <div className={style.info}>
                    <div className={style.title}>{product.name}</div>
                    <div className={style.price}>${product.price}</div>
                </div>
                
                    <div className={style.details}>
                            <Link to={`/product/${product.id}`} className={style.linkMore}>
                                <button className={style.detailsButton}>View More</button>
                            </Link>                       
                            <button className={style.cartButton}><SC className={style.shoppingCart} onClick={handleClickCart} style={{color: cart ? '#5f27cd' : '#000'}}/></button>                        
                    </div>
                
            </div>        
        </div>
  )
}