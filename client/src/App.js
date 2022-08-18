import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from './components/organisms/Header/Header';
import Home from './components/pages/Home/Home.jsx';

function App() {
  return (
    <>      
      <Routes>
        <Route path='/' element={<Home/>}/>                
      </Routes>
    </>
  );
}

export default App;
