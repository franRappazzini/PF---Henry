import "./App.css";

import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";
import Home from "./components/pages/Home/Home.jsx";
import Profile from "./components/pages/Profile/Profile";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:productId" element={<Detail />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/create_product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
