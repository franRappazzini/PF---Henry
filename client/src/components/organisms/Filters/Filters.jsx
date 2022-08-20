import React, { useState } from 'react';

import {useDispatch} from 'react-redux';

import {filterProductBySize,filterProductByCategory,filterProductByBrand } from '../../../redux/actions/productActions';

function Filters(){
    const dispatch = useDispatch()

    function handleFilterBrand(e){
        e.preventDefault();
        dispatch(filterProductByBrand(e.target.value))
      } 
      function handleFilterCategory(e){
        e.preventDefault();
        dispatch(filterProductByCategory(e.target.value))
      } 

    return(
    <div>

            <select  onChange={e=>handleFilterBrand(e)} >
                 <option disabled selected hidden>BRANDS</option>
                    <option value='All' >All</option>
                    <option value='Nike' >Nike</option>
                    <option value='Adidas' >Adidas</option>
                    <option value='Puma' >Puma</option>
                    <option value='New Balance' >New Balance</option>
                    <option value='Reebok' >Reebok</option>
            </select>

            <select  onChange={e=>handleFilterCategory(e)} >
                 <option disabled selected hidden>CATEGORY</option>
                    <option value='All' >All</option>
                    <option value='Hombre' >Hombre</option>
                    <option value='Casual' >Casual</option>
                    <option value='Unisex' >Unisex</option>
                    <option value='Training and Fitness' >Training and Fitness</option>
                    <option value='Running' >Running</option>
            </select>

    </div>
    )
}
export default Filters;