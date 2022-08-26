import "./App.css";

import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home.jsx";
import Profile from "./components/pages/Profile/Profile";
import Favorites from "./components/pages/Favorites/Favorites";
import Cart from "./components/pages/Cart/Cart";
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/product/:productId" element={<Detail />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route path="/create_product" element={<CreateProduct />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
