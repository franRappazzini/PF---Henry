import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './components/organisms/Header/Header';
import Home from './components/pages/Home/Home.jsx';
import Detail from './components/pages/Details/Details.jsx';

function App() {
  return (
    <>      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:productId' element={<Detail />}/>
       </Routes>
    </>
  );

export default App;
