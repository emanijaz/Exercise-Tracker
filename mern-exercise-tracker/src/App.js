import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Chart from './components/Chart';
function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element = {<Dashboard/>}></Route>
          <Route path="/calculator" element = {<Calculator/>}></Route>
          <Route path="/chart" element = {<Chart/>}></Route>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
