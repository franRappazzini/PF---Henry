import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardMenu from '../../organisms/DashboardMenu/DashboardMenu';
import DashboardOption from '../../organisms/DashboardOption/DashboardOption';
import ProductsOption from '../../organisms/ProductsOption/ProductsOption';
import UsersOption from '../../organisms/UsersOption/UsersOption';
import { getAllUsers } from '../../../redux/actions/userActions';
import style from './Dashboard.module.css';
import OrdersOption from '../../organisms/OrdersOption/OrdersOption';

export default function Dashboard() {
  let dispatch = useDispatch();
  let { users } = useSelector((state) => state.user);
  let [option, setOption] = useState('dashboard');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log('allusers from dashboard', users);
  return (
    <div className={style.globalContainer}>
      <div className={style.menu}>
        <DashboardMenu setOption={setOption} />
      </div>
      <div className={style.info}>
        {
            option === 'dashboard' ? (
          <DashboardOption />
        ) : option === 'users' ? (
          <UsersOption users={users} />
        ) : option === 'products' ? (
          <ProductsOption />
        ) : option === 'orders' ? (
          <OrdersOption />
        ) : null
      }
      </div>
    </div>
  );
}
