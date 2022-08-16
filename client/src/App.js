import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/organisms/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>{/* aca irian las <Route /> */}</Routes>
    </>
  );
}

export default App;
