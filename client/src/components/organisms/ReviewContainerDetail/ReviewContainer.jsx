// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"

import style from "./ReviewContainer.module.css"
import {useSelector} from "react-redux"
// import {useParams/* , useState */} from "react-router-dom"
// import { getProductDetail } from "../../Redux/actions";
import { useDispatch } from "react-redux"
import { getBoughts, getLogedUser } from "../../../redux/actions/userActions";
import { useAuth0 } from "@auth0/auth0-react";
import { createReview } from "../../../redux/actions/ratingActions"
import { useParams } from "react-router-dom"
import { Rating } from "@mui/material"
import { FaPaperPlane } from "react-icons/fa"
import RevCard from "../RevCard/RevCard.jsx"
import {getProduct } from "../../../redux/actions/productActions"
import Swal from 'sweetalert2'



export default function ReviewContainer({productDetail}){

    const params = useParams()
   
    const { isAuthenticated, user } = useAuth0();
    const { logedUser, boughts } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [revSend, setRevSend] = useState(false)
    useEffect(() => {
      isAuthenticated && dispatch(getLogedUser(user));      
    }, [dispatch, isAuthenticated, user, logedUser,productDetail]);
    let userId = logedUser.id

    console.log('MyUserId', logedUser );
    
    const [stars, setStars] = useState(0)

    const [review, setReview] = useState({
      text:"",
      simplecontrolled:0,
      userId:userId,
      productId:params.productId,
      username:`${logedUser.given_name} ${logedUser.family_name}`
    })
   
    const handleChange = (e)=>{
      e.preventDefault()
      setReview({
        ...review,
        [e.target.name.split("-").join("")]:e.target.value
      })
    }

    const handleSubmit = async (e)=>{
      e.preventDefault()
      let spanValid = document.getElementById("validation")
      if(!stars){
        spanValid.textContent = "You have to give rating!"
        return
      }else if(!review.text.length){
        spanValid.textContent = "You have to write something!"
        return
      }else if(!review.userId){
        spanValid.textContent = "You have to be registered to post a review!"
        return
      }else if (logedUser.id){
        // dispatch(getBoughts(logedUser.email))   
        // console.log('Boughts From asdadsasdasd:', boughts.filter(bought=>bought.Product_Sizes.filter(bought=>bought.ProductId===productDetail.id)));
        
        spanValid.textContent = ""
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2000,  
          timerProgressBar: true,
          ProgressBarColor: "white",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Your review was posted successfully!',
          background: "#1fa347",
          color: "white",
          
        })
      }
      const newRev = {
        ...review,
        userId:logedUser.id
      }
      console.log("se dispacha createReview, ", newRev)
      await createReview(newRev)
      console.log(productDetail.id)
      dispatch(getProduct(productDetail.id))
      setRevSend(true)
    }

    return(
        <div className={style.review_container}>
          <h1 className={style.review_title}>REVIEWS</h1>
          <div className={style.reviews}>

          {
          productDetail.Ratings ?
          productDetail.Ratings.map((e,i)=><RevCard prodId={productDetail.id} key={e.id} id={e.id} userName={e.username} isAdmin={logedUser.isAdmin}  text={e.text} profPic={logedUser.picture} revStars={e.stars}/>) :
          ""
          }
            
          </div>
        <div className={style.stars_container}>
          <span id="validation" className={style.validation}></span>
          <Rating
          id="rating"
            name="simple-controlled"
            value={stars}
            onChange={(e, newValue) => {
              setStars(newValue);
              handleChange(e);
            }}
          />
          </div>
          <form onSubmit={(e)=>handleSubmit(e)} className={style.review_form}>
          
            <textarea onChange={(e)=>handleChange(e)} placeholder="Write your own review..." className={style.textarea} name="text" id="review" cols="30" rows="10"></textarea>
            <button className={style.review_submit_button} type="submit"><FaPaperPlane className={style.plane_icon} style={boughts.length?{pointerEvents:'none'}:{}}/></button>
          </form>
        </div>
    )
  };