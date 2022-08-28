// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from "react-redux"
import style from "./FormUpdateProduct.module.css"
import { SiNike } from 'react-icons/si';
import { SiAdidas } from 'react-icons/si'
import { SiPuma } from 'react-icons/si'
import { SiReebok } from 'react-icons/si'
import { SiNewbalance } from 'react-icons/si'
import { BiError } from 'react-icons/bi'
import { FaHeart } from "react-icons/fa"
import { Box, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputsUpdate from "../../molecules/InputsUpdate/InputsUpdate";

import { useState } from "react";
import { addFavorites, removeFavorites, addToCart, removeFromCart } from "../../../redux/actions/productActions"
import { getBrands,getCategories } from "../../../redux/actions/otherActions";

// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function ProductContainer({ productDetail }) {
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState(0)
  const { favorites, cartProducts } = useSelector(state => state.product)
  let checkFaved = () => {
    return favorites.filter(fav => fav.id === productDetail.id).length
  }
  const [fav, setFav] = useState(checkFaved() ? true : false)

  const instanceProduct = { name: productDetail.name, brand: productDetail.Brand.name, price: productDetail.price,categories:productDetail.Categories,sizes:productDetail.Sizes };
  const [product, setProduct] = useState(instanceProduct);
  const [category,setCategory] = useState(productDetail.Categories)

  const { brands } = useSelector((state) => state.other);
  const { categories } = useSelector((state) => state.other);
  const { sizes } = useSelector((state) => state.other);
   useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);


  const handleFav = (e) => {
    e.preventDefault()
    if (fav) {
      dispatch(removeFavorites(productDetail.id))
      setFav(false)
    } else {
      dispatch(addFavorites(productDetail))
      setFav(true)
    }
  }
  console.log(productDetail)

  const handleChange= (e)=>{
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleCategory= (e)=>{
    let auxCat=product.categories.map(e=>e.name)
    e.preventDefault()
    if(product.categories.includes(e.target.value.name) || auxCat.includes(e.target.value.name)){
      alert("The product has this category")
    }else{
      setProduct({
        ...product,
        categories:[...product.categories,e.target.value]
      })

    }
   
  }

 



  if (productDetail) {
    return (
      <div className={style.product_container}>
        <div className={style.left_side}>
          <div className={style.top_left_container}>
            {productDetail.Brand.name === 'Nike' ? <SiNike className={style.brand_icon} size={40} /> : productDetail.Brand.name === 'Adidas' ? <SiAdidas className={style.brand_icon} size={40} /> : productDetail.Brand.name === 'Puma' ? <SiPuma className={style.brand_icon} size={40} /> : productDetail.Brand.name === 'Reebok' ? <SiReebok className={style.brand_icon} size={40} /> : productDetail.Brand.name === 'New Balance' ? <SiNewbalance className={style.brand_icon} size={40} /> : <BiError className={style.brand_icon} size={40} />}
            <button onClick={(e) => { handleFav(e) }} className={style.heart_button}><FaHeart className={!fav ? style.heart_icon1 : style.heart_icon2} /></button>
          </div>
          <img className={style.product_img} src={productDetail.image} alt="" />
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
              <MenuItem value="">
                <em>{productDetail.Brand.name}</em>
              </MenuItem>
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
            <TextField
              label="Image"
              variant="standard"
              autoComplete="off"
              name="image"
              type="file"
              color="secondary"
              // onChange={handleChangeImage}
              required
            />

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
                value={product.categories}
                required
              >
                {/* <MenuItem >
                  <em>None</em>
                </MenuItem> */}
                {categories.length > 0 &&
                  categories.map((category) => (
                    <MenuItem key={category.name} value={category} >
                      {category.name} 
                    </MenuItem>
                  ))}
              </TextField>

              
                <div className={style.mapCat}>   
                {product.categories.map((categorys) => (
                  
                  <p className={style.pCat}>{categorys.name}<IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton></p>
                  
                ))}
                </div> 

            </div>


            {/* Sizes */}
            <Button sx={{ marginTop: "1rem" }}>
              Select Size
            </Button>
            <Dialog disableEscapeKeyDown >
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
                      // onChange={handleChange}
                      value=""
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
                    // onChange={handleChange}
                    value=""
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button >Cancel</Button>
                <Button>Ok</Button>
              </DialogActions>
            </Dialog>
            <div className={style.sizes}>
              {productDetail.Sizes.map((size) => (
                <div className={style.sizesDiv}>
                  <p>Size:{size.size}</p>
                  <p>Stock:{size.Product_Size.stock}</p>
                </div>

              ))}
            </div>

            <Button variant="contained">Save</Button>

            </form>
        
        </div>
      </div>
    )
  }
}