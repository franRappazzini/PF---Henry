// eslint-disable-next-line no-unused-vars
import React from "react"

import style from "./ReviewContainer.module.css"

// import {useEffect} from "react"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";


export default function ReviewContainer(){
   


    /* let params = useParams() */

    
   
    /* useEffect(()=>{
        getProductDetail(params.productId)
    },[]) */
    return(
        <div className={style.review_container}>
          <h1 className={style.review_title}>REVIEWS</h1>
          <div className={style.reviews}>
            
          </div>
          <form className={style.review_form}>
            <textarea placeholder="Write your own review..." className={style.textarea} name="review" id="review" cols="30" rows="10"></textarea>
            <button className={style.review_submit_button} type="submit">SEND</button>
          </form>
        </div>
    )
  };