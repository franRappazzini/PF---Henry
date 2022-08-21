import React, { useState } from 'react';
import style from './Order.module.css';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from "../../../redux/actions/productActions.js";
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
<div className={style.orderContainer}>
  <select onChange={e=>handleFilterPrice(e)} className={style.order}>
    <option  disabled selected hidden>Sort By</option>
    <option value='ascending'>Ascending</option>
    <option value='descending' >Descending</option>
  </select>
</div>
);
}
export default Order;