import "./App.css";

import { Route, Routes } from "react-router-dom";

import Cart from "./components/pages/Cart/Cart";
import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Detail from "./components/pages/Details/Details.jsx";
import Favorites from "./components/pages/Favorites/Favorites";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home.jsx";
import NotFound from "./components/pages/NotFound/NotFound";
import Profile from "./components/pages/Profile/Profile";
import ProtectedRoute from "./components/middleware/ProtectedRoute/ProtectedRoute";
import Update from "./components/pages/Update/Update";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/create_product" element={<CreateProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Home />} />

        <Route path="/product/:productId" element={<Detail />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/update/:productId" element={<Update />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
