import "./App.css";

import { Route, Routes } from "react-router-dom";

import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/products/:productId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
