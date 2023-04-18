import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {Routes, Route} from 'react-router-dom';

function Routing(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}
    
export default Routing