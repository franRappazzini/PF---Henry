
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../redux/reducer/productReducer';
import Card from '../../organisms/Card/Card.jsx'

export default function Cart(){
    const [products, setProducts] = React.useState(getAllProducts);
    const [cart, setCart] = React.useState([]);
    const [compraRealizada, setCompraRealizada] = React.useState(false);
    let { cartProducts } = useSelector((state) => state.product) 

    // const addProduct = product => {
    //     const productsList = products.filter(item => item.id !== product.id);
    //     setProducts(productsList);
    //     setCart([...cart, product]);
    //   };


      const deleteProduct = product => {
        const productsList = cart.filter(item => item.id !== product.id);
        setProducts([...products, product]);
        setCart(productsList);
      };

      const comprar = () => {
        setProducts(getData());
        setCart([]);
        setCompraRealizada(true);
      };

      const getTotal = () => {
        let total = 0;
        cart.forEach(item => {
          total = total + item.precio;
        });
        return total;
      };

      return(
        <div>

{/* cart */}
    <div>
        {/* BOTON CARRITO DESDE DETAIL */}
        {/* <button onClick={() => addProduct(item)}>Add</button> */}

        <h4>Carrito</h4>
        <ul>

          {cartProducts.map(prod=><Card id={prod.id} />)}
          {!compraRealizada && cart.length === 0 && <span>Vacio 😑</span>}
          {cart.map(item => (
            <li>
              <span>{item.description}</span>
              {/* delete */}
              <button  onClick={() => deleteProduct(item)}>
                Quitar
              </button>
            </li>
          ))}

          {compraRealizada && (
            <p>
              Gracias por tu compra! <span>🎉</span>
            </p>
          )}
        </ul>

{/* detalle */}
        <div> 
          {!compraRealizada && (
            <p>
              <strong>Total: $</strong>
              {getTotal()}
            </p>
          )}
          {!compraRealizada && (
            <button
              className={cart.length === 0 ? "disabled" : null}
              disabled={cart.length === 0}
              onClick={comprar}
            >
              Comprar
            </button>
          )}
        </div>
        </div>
        </div>
      )
}
