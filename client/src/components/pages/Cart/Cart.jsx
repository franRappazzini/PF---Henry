import React, { useEffect, useState } from "react";

import CartCard from "../../organisms/CartCard/CartCard.jsx";
import FormAdress from "../../organisms/FormAdress/FormAdress.jsx";
import NoProductsFound from "../../molecules/NoProductsFound/NoProductsFound.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./Cart.module.css";
import { useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import { useAuth0 } from "@auth0/auth0-react";
import { getLogedUser } from "../../../redux/actions/userActions.js";

//Preguntar si x query llega un status failed y mostrar un toast

export default function Cart(product) {
  const [lsCartProducts, setLsCartProducts] = useState([]);
  const [datos, setDatos] = useState("");
  const [input, setInput] = useState(false);
  const [adress, setAdress] = useState("");
  let { cartProducts } = useSelector((state) => state.product);
  const [amount, setAmount] = useState(product.choosedAmount);
  const [totalAmount, setTotalAmount]=useState(totalPrice())

  const search = useLocation().search;
  const status = new URLSearchParams(search).get("status");
  const dispatch = useDispatch()
  const swal = withReactContent(Swal)
  const {user, isAuthenticated} = useAuth0()
  const {logedUser} = useSelector((state) => state.user)
 
  useEffect(() => {
    setLsCartProducts(JSON.parse(localStorage.getItem("lsCartProducts")) || []);
    isAuthenticated && dispatch(getLogedUser(user))
    if (status) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        ProgressBarColor: "white",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "There was an error with the purchase, please try again",
        background: "#c70000",
        color: "white",
        textAlign: "center",
      });
    }

    
  }, []);

//   useEffect(()=>{
//     console.log("ACAAA")
//     console.log(totalAmount)
//     for (let index = 0; index < lsCartProducts.length; index++) {
//       setTotalAmount(totalAmount+ lsCartProducts[index].price)
//     }
//   },[CartCard,lsCartProducts,localStorage])
// console.log(totalAmount)

 function totalPrice(){
  let suma=0
 JSON.parse(localStorage.getItem("lsCartProducts")).forEach(e => {
  suma+=(e.choosedAmount*e.price)
 });
 console.log("suma total price")
 console.log(suma)
 return suma
}

  const handleAdressChange = (e) => {
    setAdress(e.target.value);
  };

  const handleOpenAdress = () => {
    setInput(true);
  };

  const handleCloseAdress = () => {
    setInput(false);
  };
  function validations() {
    // const imageRegex = /^.+.(jpe?g|gif|png)$/i;
    if(user === undefined) return "Only loged user can buy in this page!"
    // if (logedUser.isAdmin) return "Admins can´t buy in this page";
    //  if(!user.email_verified) return "You must verify your email!"
  }

  const onClickBuy = () => {
    // console.log(lsCartProducts);
    handleCloseAdress()
    if (validations()) return swal.fire("Error..", validations(), "error");
    localStorage.setItem("adress", JSON.stringify(adress));
    axios
      .post("/mercadopago/payment", {
        lsCartProducts: JSON.parse(localStorage.getItem("lsCartProducts")),
      })
      .then((data) => {
        window.location.replace(data.data);
      })
      .catch((err) => console.error(err));
  };

  // handleBuy = async () => {
  //   try {
  //     const res = await axios.post("/mercadopago/payment", { lsCartProducts })
  //     setDatos(res.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const price_products_total= amount * product.price;

 const handleAmount= async ()=> {
  var total =totalAmount
  const ls=await JSON.parse(localStorage.getItem("lsCartProducts"))
  
 for (let index = 0; index < ls.length; index++) {
    total= total + (ls[index].price * ls[index].choosedAmount)
    
  }
 
  setTotalAmount(total)
  }

  return (
    <div className={style.cart_container}>

      
      {/* <script src="https://sdk.mercadopago.com/js/v2"></script> */}
      {/* <h1 className={style.h1_cart}>MY CART</h1> */}
      <div className={cartProducts.length ? style.card_container : style.empty_container}>
        {lsCartProducts.length ? (
          lsCartProducts.map((e, i) => (
            <div key={i} className={style.card}>
              <CartCard
                product={e}
                lsCartProducts={lsCartProducts}
                setLsCartProducts={setLsCartProducts}
                totalPrice={totalPrice}
                handleAmount={handleAmount}
              />
              {/* <span>{e.choosedAmount}</span><span>{e.choosedSize}</span> */}
          {/* <div className={style.price_product}>
          Price: {price_products_total}
          </div> */}
            </div>
          ))
        ) : (
          <NoProductsFound message="You haven't added products to the cart... yet ;)" />
        )}

<div className={lsCartProducts.length>0 ? style.buy : style.buyEmpty}> 
<p className={style.price}>Total Price: ${totalPrice()}
</p>
<button className={style.buy_button} onClick={() => handleOpenAdress()}>
        BUY
      </button>
</div>
        </div>
        



      
      
      <FormAdress
        adress={adress}
        input={input}
        handleCloseAdress={handleCloseAdress}
        handleAdressChange={handleAdressChange}
        onClickBuy={onClickBuy}
      />
      
    </div>
  );
}
