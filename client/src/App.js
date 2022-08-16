import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/organisms/Header/Header";
import Detail from "./components/pages/Details/Details.jsx"

function App() {
  return (
    <>
      <Header />
      <Detail path="/products/:productId" component={Detail}/>
      <Routes>{/* aca irian las <Route /> */}</Routes>
    </>
  );
}

export default App;
