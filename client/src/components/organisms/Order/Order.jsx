import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { getAllProducts } from "../../../redux/actions/productActions.js";

import { filterProductByPrice } from '../../../redux/actions/productActions';

import style from './Card.module.css';

function handleFilterPrice(e){
    e.preventDefault();
    dispatch(filterProductByPrice(e.target.value))
  } 

function Order(){
return(
<div>

<select onChange={e=>handleFilterPrice(e)}>
        <option  disabled selected hidden>ORDER</option>
        <option value='ascending'>Ascending</option>
        <option value='descending' >Descending</option>
</select>

</div>

);
}
export default Order;