import './App.css';
import Deptform from './components/department/Deptform';
import Department from './components/department/Department';
import Depupdate from './components/department/Depupdate';

import Login from './components/login/Login';
import Home from './components/home/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import Headform from './components/department head/Headform';
import Head from './components/department head/Head';

import Employeeform from './components/employee/Employeeform';
import Employee from './components/employee/Employee';
import Headupdate from './components/department head/Headupdate';
import EmpUpdate from './components/employee/EmpUpdate';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          
          <Route path='/depform' element={<Deptform/>}></Route>
          <Route path='/department' element={<Department/>}></Route>
          <Route path='/depupdate/:id' element={<Depupdate/>}></Route>

          <Route path='/headform' element={<Headform/>}></Route>
          <Route path='/headdata' element={<Head/>}></Route>
          <Route path='/headupdate/:id' element={<Headupdate/>}></Route>
          
          <Route path='/empform' element={<Employeeform/>}></Route>
          <Route path='/empdata' element={<Employee/>}></Route>
          <Route path='/empupdate/:id' element={<EmpUpdate/>}></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
