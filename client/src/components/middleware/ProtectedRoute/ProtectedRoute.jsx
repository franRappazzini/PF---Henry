import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLogedUser } from "../../../redux/actions/userActions";
import { useAuth0 } from "@auth0/auth0-react";
import PurchaseHistory from "../../pages/PurchaseHistory/PurchaseHistory";

function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth0();
  const { logedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated && dispatch(getLogedUser(user));
  }, [dispatch, isAuthenticated, user]);


  return logedUser?.isAdmin ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;
