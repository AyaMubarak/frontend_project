import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { UserContext } from '../Navbar/UserContext';
import { toast, Bounce } from 'react-toastify';
function Signin() {
  const { setUserToken } = useContext(UserContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://ecommerce-node4.vercel.app/auth/signin", user);
      const data = response.data;

      if (data.message === 'success') {
        console.log('Login successful:', data);
        localStorage.setItem("userToken", data.token);
        toast.success("Login successful!")
      
        setUserToken(data.token);
        navigate('/');
      } else if (data.message === 'plz confirm your email') {
        toast.error('plz confirm your email')
      } else {
        console.error('Login failed:', data);
        toast.error('Login failed ',data)
      }
    } catch (error) {
      console.error('Error submitting login form:', error);
      console.log('Server responded with:', error.response.data);
      toast.error('Server responded with:',error)
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Login Illustration" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" name="email" value={user.email} onChange={handleChange} required />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" name="password" value={user.password} onChange={handleChange} required />

            <div className="d-flex justify-content-between mb-4">
              <Link to="/forget">Forgot password?</Link>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to={`/signup`} className="link-danger">Register</Link></p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signin;
