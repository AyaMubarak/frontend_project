import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./App.css";
import Root from "./component/Root/Root";
import Home from "./component/home/Home";
import Products from "./component/product/Product";
import Signin from "./component/sigin/Signin";
import Signup from "./component/signup/Signup";
import Cart from "./component/cart/Cart";
import Man from "./component/Catogeries/type/Man";
import Appliances from "./component/Catogeries/type/Appliances";
import Beauty from "./component/Catogeries/type/Beauty";
import Electronics from "./component/Catogeries/type/Electronics";
import Fragrances from "./component/Catogeries/type/Fragrances";
import Kitchen from "./component/Catogeries/type/Kitchen";
import Laptops from "./component/Catogeries/type/Laptops";
import Mobile from "./component/Catogeries/type/Mobile";
import Wemon from "./component/Catogeries/type/Wemon";
import ProductsDe from "./component/product/ProductsDe"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductedRouter from './component/ProductedRouter';
function App(){
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement:<h1>Error </h1>,
      children: [
        { path: "/", element: <Home /> },
        { path: "products", element:<ProductedRouter> <Products /> </ProductedRouter>
         },
        { path: "products/:productId", element: <ProductsDe /> },
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <Signup /> },
        { path: "cart", element: <Cart /> },
        { path: "men's fashion", element: <Man /> },
        { path: "home & kitchen", element: <Kitchen /> },
        { path: "appliances", element: <Appliances /> },
        { path: "electronics", element: <Electronics /> },
        { path: "fragrances", element: <Fragrances /> },
        { path: "women's fashion", element: <Wemon /> },
        { path: "mobiles", element: <Mobile /> },
        { path: "laptops & accessories", element: <Laptops /> },
        { path: "beauty", element: <Beauty /> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;




