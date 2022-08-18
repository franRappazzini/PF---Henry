import "./App.css";

import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/products/:productId" element={<Detail />} />

        <Route path="/create_product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
