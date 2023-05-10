import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Products from './pages/Products';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function Routing() {
  const loginData = localStorage.getItem('loginData');
  const gmailLogin = localStorage.getItem('gmailLogin');
  const facebookLogin = localStorage.getItem('facebookLogin');
  const signupData = localStorage.getItem('signupData');

  const authentication = loginData || gmailLogin || facebookLogin ||signupData
  
  return (
    <>
      {/* {authentication ? <Header/> : null} */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default Routing