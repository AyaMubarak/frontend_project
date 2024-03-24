import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./component/Footer/Footer.jsx"
import Navbar from './component/Navbar/Navbar';
import Root from './component/Root/Root';
import Home from './component/home/Home';
import Products from './component/product/Product';
import Signin from './component/sigin/Signin';
import Signup from './component/signup/Signup';
import Cart from './component/cart/Cart';
import Man from './component/Catogeries/type/Man';
import Appliances from './component/Catogeries/type/Appliances';
import Beauty from './component/Catogeries/type/Beauty';
import Electronics from './component/Catogeries/type/Electronics';
import Fragrances from './component/Catogeries/type/Fragrances';
import Kitchen from './component/Catogeries/type/Kitchen';
import Laptops from './component/Catogeries/type/Laptops';
import Mobile from './component/Catogeries/type/Mobile';
import Women from './component/Catogeries/type/Wemon';
import ProductsDe from './component/product/ProductsDe';
import Forget from './component/sigin/Forget';
import OrderPage from './component/cart/OrderPage';
import UserContextProvider from './component/Navbar/UserContext';
import OrderDe from "./component/Navbar/OrderDe"
import Profile from "./component/Navbar/Profile"
function App() {

  return (
  
      <Router>
   
   <UserContextProvider>
          <Routes>
            
            <Route path="/" element={<Root />}>
              <Route path="/" element={<Home />} />
              <Route path='/'element={<Navbar />}/>
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<ProductsDe />} />
              <Route path="cart" element={<Cart />} />
              <Route path="men's fashion" element={<Man />} />
              <Route path="home & kitchen" element={<Kitchen />} />
              <Route path="appliances" element={<Appliances />} />
              <Route path="electronics" element={<Electronics />} />
              <Route path="fragrances" element={<Fragrances />} />
              <Route path="women's fashion" element={<Women />} />
              <Route path="mobiles" element={<Mobile />} />
              <Route path="laptops & accessories" element={<Laptops />} />
              <Route path="beauty" element={<Beauty />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="orderDe" element={<OrderDe />} />
              <Route path="profile" element={<Profile />} />
              <Route path="footer" element={<Footer />} /> 

              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
               <Route path="forget" element={<Forget />} />
            </Route>
          </Routes>
          </UserContextProvider>
       
    
      <ToastContainer /> </Router>

  );
}

export default App;
