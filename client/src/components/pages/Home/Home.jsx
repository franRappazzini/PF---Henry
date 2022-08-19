import Card from "../../organisms/Card/Card";
import React from "react";
import { connect } from "react-redux";
import img1 from "../../../assets/products/testing shoes/Nike Air Max 270 black.png";
import img2 from "../../../assets/products/testing shoes/Adidas Ozelle CloudFoam.png";
import img3 from "../../../assets/products/testing shoes/Adidas UltraBoost DNA.png";
import img4 from "../../../assets/products/testing shoes/Nike Air Griffey Max 1 Aqua.png";
import img5 from "../../../assets/products/testing shoes/Puma Pride Suede.png";
import img7 from "../../../assets/products/testing shoes/New Balance 237.png";
import img8 from "../../../assets/products/testing shoes/Nike Dunk High.png";
import img9 from "../../../assets/products/testing shoes/BRAINDEAD CLUB C REVENGE.png";
import style from "./Home.module.css";

export default function Home(/*{ products, getAllProducts }*/) {
  let products = [
    {
      //pseudo product
      image: img1,
      title: "Nike Air Max 270",
      price: 52000,
      brand: "Nike",
    },
    {
      //pseudo product
      image: img2,
      title: "Adidas Ozelle CloudFoam",
      price: 52000,
      brand: "Adidas",
    },
    {
      //pseudo product
      image: img7,
      title: "New Balance 237",
      price: 38000,
      brand: "New Balance",
    },
    {
      //pseudo product
      image: img4,
      title: "Nike Air Griffey Max 1",
      price: 77000,
      brand: "Nike",
    },
    {
      //pseudo product
      image: img5,
      title: "Puma Pride Suede",
      price: 45000,
      brand: "Puma",
    },
    {
      //pseudo product
      image: img9,
      title: "Reebok Pump Fury 94",
      price: 67000,
      brand: "Reebok",
    },
    {
      //pseudo product
      image: img3,
      title: "Adidas UltraBoost DNA",
      price: 67000,
      brand: "Adidas",
    },
    {
      //pseudo product
      image: img8,
      title: "Nike Dunk High",
      price: 65000,
      brand: "Nike",
    },
  ];
  return (
    <div className={style.container}>
      {products.map((product) => (
        <Card product={product} />
      ))}
    </div>
  );
}

// let mapStateToProps = (state) => {
//     return {
//         products: state.products,
//     };
//   }

// export default connect(mapStateToProps,{ getAllProducts })(Home);
