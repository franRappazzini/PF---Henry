import './App.css';

<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/pages/CreateProduct/CreateProduct";
import Detail from "./components/pages/Details/Details.jsx";
import Header from "./components/organisms/Header/Header";
=======
import { Route, Routes } from 'react-router-dom';
import Header from './components/organisms/Header/Header';
import Home from './components/pages/Home/Home.jsx';
import Detail from './components/pages/Details/Details.jsx';
>>>>>>> origin/development

function App() {
  return (
    <>      
      <Routes>
<<<<<<< HEAD
        <Route path="/products/:productId" element={<Detail />} />

        <Route path="/create_product" element={<CreateProduct />} />
      </Routes>
=======
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:productId' element={<Detail />}/>
       </Routes>
>>>>>>> origin/development
    </>
  );

export default App;
