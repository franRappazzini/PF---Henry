import React from "react"
import {useState} from 'react'
import {useDispatch} from "react-redux"
import { searchProduct } from "../../../redux/actions/productActions"


export default function SearchBar(){
    const dispatch =useDispatch()
    const [product,setProduct]=useState("")

    function handleChange(e){
        e.preventDefault()
        setProduct(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault() 
        dispatch(searchProduct(product))

    }

    return (
        <div>            
            <form>
                <input   type="text" placeholder="Search..."  onChange={(e) => handleChange(e)} />
                <button  type="submit" onClick={(e) => handleSubmit(e)} >Search</button>
            </form>
        </div>
    )
}