import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dsahboard';
import EmployeeList from './Components/EmployeeList';
import CreateEmployee from './Components/CreateEmployee';
import Login from './Components/Login';
import Signin from "./Components/Signin";
import EditData from './Components/EditData';

function App() {
  return (
    <div>
      {/* <Login /> */}

      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/employeeList' element={<EmployeeList />} />
        <Route path='/createEmployee' element={<CreateEmployee />} />
        <Route path='/edit/' element={<EditData />}/>
      </Routes>

    </div>
  );
}

export default App;
