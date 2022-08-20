<<<<<<< HEAD
=======
import React, { useEffect } from "react";
import {
  filterProductByBrand,
  filterProductByCategory,
  filterProductBySize,
} from "../../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import { getSizes } from "../../../redux/actions/otherActions";

function Filters() {
  const { sizes } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  function handleFilterBrand(e) {
    e.preventDefault();
    dispatch(filterProductByBrand(e.target.value));
  }

  function handleFilterCategory(e) {
    e.preventDefault();
    dispatch(filterProductByCategory(e.target.value));
  }

  function handleFilterSizes(e) {
    dispatch(filterProductBySize(e.target.value));
  }

  return (
    <div>
      <select onChange={(e) => handleFilterBrand(e)}>
        <option disabled selected hidden>
          BRANDS
        </option>
        <option value="All">All</option>
        <option value="Nike">Nike</option>
        <option value="Adidas">Adidas</option>
        <option value="Puma">Puma</option>
        <option value="New Balance">New Balance</option>
        <option value="Reebok">Reebok</option>
      </select>

      <select onChange={(e) => handleFilterCategory(e)}>
        <option disabled selected hidden>
          CATEGORY
        </option>
        <option value="All">All</option>
        <option value="Hombre">Hombre</option>
        <option value="Casual">Casual</option>
        <option value="Unisex">Unisex</option>
        <option value="Training and Fitness">Training and Fitness</option>
        <option value="Running">Running</option>
      </select>

      <select onChange={handleFilterSizes}>
        <option disabled selected hidden>
          SIZE
        </option>
        <option value="All">All</option>
        {sizes.length > 0 &&
          sizes.map((size, i) => (
            <option key={i} value={size.size}>
              {size.size}
            </option>
          ))}
      </select>
    </div>
  );
}
export default Filters;
>>>>>>> 404f3f6defc096adfbe646512b2ea5fda642089b
