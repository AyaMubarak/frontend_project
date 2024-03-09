import { NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js"
import "./navbar.css"
function Navbar() {


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <NavLink className="nav-link"  aria-current="page" to="/">Home</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link"   to="products">Products</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link"   to="signin">Signin
              </NavLink>
                      </li>
                     <li className="nav-item">
                        <NavLink className="nav-link"   to="signup">Signup</NavLink>
              </li>
              <li className="nav-item">
                        <NavLink className="nav-link"   to="cart">Cart</NavLink>
              </li>
             
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown"  aria-expanded="false" to="/catogeries">
                        Categories
                        </NavLink>
                        <ul className="dropdown-menu">
                       <li> <NavLink  className="dropdown-item"   to="men's fashion">Men Fashion </NavLink></li>
                       <hr />
                  <li><NavLink  className="dropdown-item"   to="appliances">Appliances</NavLink></li>
                  <hr  />
                 <li> <NavLink className="dropdown-item"  to="women's fashion">Women fashion</NavLink></li>
                 <hr />
                  <li><NavLink className="dropdown-item"  to="mobiles">Mobiles</NavLink></li>
                  <hr />
                  <li><NavLink  className="dropdown-item" to="electronics">Electronics</NavLink></li>
                  <hr />
                  <li><NavLink className="dropdown-item"  to="laptops & accessories">Laptops & Accessories</NavLink></li>
                  <hr />
                  <li><NavLink className="dropdown-item"  to="home & kitchen">Home & Kitchen</NavLink></li>
                  <hr   />
                  <li><NavLink className="dropdown-item"   to="fragrances">Fragrances</NavLink></li>
                  <hr />
                 <li> <NavLink className="dropdown-item"  to="beauty">Beauty</NavLink></li>
              
                        </ul>
                      </li>
                    </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
               
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
