import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element = {<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
