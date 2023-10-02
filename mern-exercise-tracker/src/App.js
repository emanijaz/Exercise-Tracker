import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element = {<Dashboard/>}></Route>
          <Route path="/calculator" element = {<Calculator/>}></Route>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
