import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Chart from './components/Chart';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import {ConfigProvider} from 'antd';


function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={<PrivateRoute><Dashboard/></PrivateRoute>}
          />
          <Route
            path="/calculator"
            element={<PrivateRoute><Calculator/></PrivateRoute>}
          />
          <Route
            path="/chart"
            element={<PrivateRoute><Chart/></PrivateRoute>}
          />
          <Route path="/login" element = {<Login/>}></Route>

      </Routes>
      </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
