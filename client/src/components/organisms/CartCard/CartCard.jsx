import React, { useState } from 'react';
import style from './CartCard.module.css';
import { Link } from 'react-router-dom'
import { MdOutlineFavoriteBorder as F, MdOutlineAddShoppingCart as SC} from  'react-icons/md';
import { SiNike, SiAdidas, SiPuma, SiNewbalance, SiReebok } from 'react-icons/si';
import { GrClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io"
import { removeFromCart} from '../../../redux/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';


export default function Card({product}) {
    let dispatch = useDispatch()
    let { cartProducts } = useSelector(state=> state.product)
    const [amount, setAmount] = useState(product.choosedAmount)

    let mySize = product.Sizes.filter(e=>e.size===product.choosedSize)
    const stock = mySize[0].Product_Size.stock
    console.log(stock)

    
     let amountSpan = document.getElementById("amount")
    
    
    console.log(amountSpan.value);
    const handleClose= (e)=>{
        e.preventDefault()
        dispatch(removeFromCart(`${product.name}-${product.choosedSize}-${product.choosedAmount}`))
    }
    const handlePlus = (e)=>{
        e.preventDefault()
        if(amountSpan.textContent===stock.toString()){
            return
        }else{
            setAmount(amount+1)
        }
    } 
    const handleMin = (e)=>{
        e.preventDefault()
        if(amountSpan.textContent==="1"){
            return
        }else{
            setAmount(amount-1)
        }
    }
  return (
        <div className={style.box}>
            <div className={style.left_container}>
            <div className={style.image_container}>
            <img className={style.product_image} src={product.image} alt={product.image} />
            <div className={style.image_background}></div>
            </div>
            <h2 className={style.price}>{product.price} $</h2>
            </div>
            <div className={style.br}></div>
            <div className={style.right_container}>
                <div className={style.top_right}>
                    <button onClick={(e)=>handleClose(e)} className={style.close_button}><IoMdClose className={style.close_icon}/></button>
                </div>
            <div className={style.info_container}>
                <h1 className={style.title}>{product.name}</h1>
                <span className={style.categories}>{product.Categories?product.Categories.map(e=>e.name).join(", "):""}</span>
            </div>
            <div className={style.amount_and_size}>
            <span className={style.size_span}>SIZE: {product.choosedSize}</span>
            <div className={style.plus_min_container}><button onClick={(e)=> handleMin(e)} className={style.plus_min}>-</button><button onClick={(e)=> handlePlus(e)} className={style.plus_min}>+</button></div>
            <span id="amount" className={style.amount_span}>{amount}</span>
            </div>
            </div>
        </div>
  )
}