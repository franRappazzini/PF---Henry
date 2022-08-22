import React, { useState } from 'react';

import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllProducts } from "../../../redux/actions/productActions.js";

<<<<<<< HEAD
import { filterProductByPrice } from '../../../redux/actions/productActions';

// import style from './Card.module.css';


// function handleFilterPrice(e){
//     e.preventDefault();
//     dispatch(filterProductByPrice(e.target.value))
//   } 

function Order(){
    const dispatch = useDispatch()
    function handleFilterPrice(e){
        e.preventDefault();
        dispatch(filterProductByPrice(e.target.value))
      } 
return(
<div>

<select onChange={e=>handleFilterPrice(e)}>
        <option  disabled selected hidden>ORDER</option>
        <option value='ascending'>Ascending</option>
        <option value='descending' >Descending</option>
</select>

</div>

);
=======
  return (
    <FormControl
      size="small"
      sx={{ marginTop: "0.5rem", minWidth: "6rem" }}
    >
      <InputLabel id="order">Order</InputLabel>
      <Select
        labelId="order"
        id="demo-simple-select"
        label="ORDER"
        onChange={handleFilterPrice}
        sx={{ backgroundColor: "white" }}
      >
        <MenuItem value={"ascending"}>Ascending</MenuItem>
        <MenuItem value={"descending"}>Descending</MenuItem>
      </Select>
    </FormControl>
  );
>>>>>>> origin/development
}
export default Order;