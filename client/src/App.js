import "./App.css";

import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home.jsx";
import Favorites from "./components/pages/Favorites/Favorites";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create_product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
