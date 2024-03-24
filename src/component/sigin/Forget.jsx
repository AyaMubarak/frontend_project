import { useState } from 'react';
import { Link } from "react-router-dom";
import forget from "../../assets/images/3293465.jpg";

function Forget() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ecommerce-node4.vercel.app/auth/sendcode', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setCodeSent(true);
        setSuccessMessage('Code has been sent to your email.');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error sending code:', error);
      setError('An error occurred while sending the code. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ecommerce-node4.vercel.app/auth/forgotPassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, password }),
      });
      if (response.ok) {
        setSuccessMessage('Password reset successful. You can now log in with your new password.');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting your password. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row gy-3 mb-5">
                  <div className="col-12">
                    <div className="text-center">
                      <Link to="/">
                        <img src={forget} alt="BootstrapBrain Logo" width={200} height={190} />
                      </Link>
                    </div>
                  </div>
                  <div className="col-12">
                    {!codeSent && (
                      <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">
                        Provide the email address associated with your account to receive a code.
                      </h2>
                    )}
                    {codeSent && (
                      <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">
                        Enter the code sent to your email and set a new password.
                      </h2>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  </div>
                </div>
                {!codeSent && (
                  <form onSubmit={handleSendCode}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                          </span>
                          <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" type="submit">Send Code</button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {codeSent && (
                  <form onSubmit={handleResetPassword}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="code" className="form-label">Code <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="password" className="form-label">New Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" type="submit">Reset Password</button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                <div className="col-12 text-center">
                  <Link to="/signin">Back to Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forget;
