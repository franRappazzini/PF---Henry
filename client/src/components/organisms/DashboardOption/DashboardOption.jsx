import { useDispatch, useSelector } from "react-redux";

import { BiUser } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import DonutChart from "../DonutChart/DonutChart";
import { FiBox } from "react-icons/fi";
import { HiTrendingUp } from "react-icons/hi";
import React, { useEffect } from "react";
import style from "./DashboardOption.module.css";
import { getAllBoughts, getAllProducts } from "../../../redux/actions/productActions";
import { getBoughts } from "../../../redux/actions/userActions";

export default function DashboardOption() {
  let { products, boughts } = useSelector((state) => state.product);
  let { users } = useSelector((state) => state.user);
  let dispatch = useDispatch()

  console.log('Boughts from DashboardOption: ', boughts);

  useEffect(()=>{
    dispatch(getAllProducts())
    dispatch(getAllBoughts())
  },[dispatch])
  return (
    <div className={style.globalContainer}>
      <div className={style.statisticsContainer}>
        <div className={style.statisticsHeader}>
          <div>Statistics</div>
        </div>

        <div className={style.statistics}>
          <div className={style.statisticsItem}>
            <HiTrendingUp
              className={style.icon}
              style={{ backgroundColor: "#33375c", color: "#6c61e0" }}
            />
            <div className={style.statisticTitleNumberContainer}>
              <div className={style.statisticNumber}>{boughts.length}</div>
              <div className={style.itemTitle}>Sales</div>
            </div>
          </div>

          <div className={style.statisticsItem}>
            <BiUser
              className={style.icon}
              style={{ backgroundColor: "#2b445a", color: "#09bcd4" }}
            />
            <div className={style.statisticTitleNumberContainer}>
              <div className={style.statisticNumber}>{users.length}</div>
              <div className={style.itemTitle}>Customers</div>
            </div>
          </div>

          <div className={style.statisticsItem}>
            <FiBox
              className={style.icon}
              style={{ backgroundColor: "#413647", color: "#db5254" }}
            />
            <div className={style.statisticTitleNumberContainer}>
              <div className={style.statisticNumber}>{products.length}</div>
              <div className={style.itemTitle}>Products</div>
            </div>
          </div>

          <div className={style.statisticsItem}>
            <BsCurrencyDollar
              className={style.icon}
              style={{ backgroundColor: "#2c434b", color: "#28c772" }}
            />
            <div className={style.statisticTitleNumberContainer}>
              <div className={style.statisticNumber}>2.5m</div>
              <div className={style.itemTitle}>Revenue</div>
            </div>
          </div>
        </div>

        <div className={style.graphsContainer}>
          <DonutChart />
        </div>
      </div>
      <div></div>
    </div>
  );
}
