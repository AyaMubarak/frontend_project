import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.module.css';

function Signin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

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
      const { data } = await axios.post('https://ecommerce-node4.vercel.app/auth/signin', user);

      if (data.message === 'success') {
        toast.success('Login successful!');
        console.log('Login successful:', data);
        navigate('/signup');
      } else {
        toast.error('Login failed. Please check your credentials.');
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Error submitting login form:', error);

      if (error.response) {
        toast.error(`Server responded with: ${error.response.status} ${error.response.data.message}`);
        console.log('Server responded with:', error.response.data);
      } else {
        toast.error('An error occurred while processing your request. Please try again.');
        console.error('An error occurred while processing your request:', error.message);
      }
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" name="email" value={user.email} onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" name="password" value={user.password} onChange={handleChange} />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Donot have an account? <Link to={`/signup`} className="link-danger">Register</Link></p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Signin;
