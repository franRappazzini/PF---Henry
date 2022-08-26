import React, {useState, useEffect} from 'react'
import style from './ProductsOption.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../../redux/actions/productActions';
import Card from '../Card/Card.jsx'
import SearchBar2 from '../SearchBar2/SearchBar2';
import { filter } from '../../../redux/actions/productActions'

export default function ProductsOption() {
  let { products } = useSelector((state) => state.product);
  let dispatch = useDispatch()

  const instanceFilter = {
    name: "",
    brand: "",
    category: "",
    size: "",
    order: { by: "price", order: "" },
  };
  const [filters, setFilters] = useState(instanceFilter);

  useEffect(() => {
    dispatch(
      filter(
        filters.name,
        filters.brand,
        filters.category,
        filters.size,
        filters.order.by,
        filters.order.order
      )
    );
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [products]); 

  return (
    <div className={style.globalContainer}>
      <div className={style.searchBarContainer}>
        <SearchBar2 filters={filters} setFilters={setFilters} label='Search product'/>
      </div>
      <div className={style.cardsContainer}>
        {
          products.map(product=> <Card key={product.id} product={product} dashboard={true} />)
        }
      </div>
    </div>
  )
}

