import axios from 'axios';
import { useState } from 'react';

import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { object, string } from 'yup';

function Signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().min(3).max(20).required(),
      email: string().email(),
      password: string().min(5).max(30).required(),
      image: string().required(),
    });

    try {
      await RegisterSchema.validate(user);
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateData();

    if (isValid) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append('userName', user.userName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('image', user.image);

        const { data } = await axios.post('https://ecommerce-node4.vercel.app/auth/signup', formData);
        console.log(data);
        
      } catch (error) {
        console.error('Error submitting form:', error.message);

        if (error.response) {
          console.log('Server responded with:', error.response.data);
        }
        
      } finally {
        setLoader(false);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: null,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && errors.map((error, index) => <p key={index}>{error} </p>)}
      <MDBContainer fluid className='my-5'>
        <MDBRow className='g-0 align-items-center'>
          <MDBCol col='6'>
            <MDBCard
              className='my-5 cascading-right'
              style={{
                background: 'hsla(0, 0%, 100%, 0.55)',
                backdropFilter: 'blur(30px)',
              }}
            >
              <MDBCardBody className='p-5 shadow-5 text-center'>
                <h2 className='fw-bold mb-5'>Sign up now</h2>
                <MDBInput
                  wrapperClass='mb-4'
                  label='User name'
                  id='userName'
                  type='text'
                  value={user.userName}
                  name='userName'
                  onChange={handleChange}
                  htmlFor='userName'
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  type='email'
                  value={user.email}
                  name='email'
                  onChange={handleChange}
                  htmlFor='email'
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  value={user.password}
                  name='password'
                  onChange={handleChange}
                  htmlFor='password'
                />
                <MDBInput
                  wrapperClass='mb-4'
                  id='image'
                  type='file'
                  name='image'
                  onChange={handleImageChange}
                  htmlFor='image'
                />
                <MDBBtn className='w-100 mb-4' size='md' type='submit' disabled={loader ? 'disabled' : null}>
                  {!loader ? 'Register' : 'Wait...'}
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Signup;
