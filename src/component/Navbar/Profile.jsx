import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get("https://ecommerce-node4.vercel.app/user/profile", {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  {userData && (
                    <>
                      <MDBCardImage src={userData.image.secure_url} alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                      <MDBTypography tag="h5">{userData.userName}</MDBTypography>
                      <MDBCardText>{userData.role}</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </>
                  )}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    {userData && (
                      <>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            
                          <MDBTypography tag="h6">UserName</MDBTypography>
                            <MDBCardText className="text-muted">{userData.userName}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                          </MDBCol>
                        
                        </MDBRow>

                        <div className="d-flex justify-content-start">
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Status</MDBTypography>
                            <MDBCardText className="text-muted">{userData.status}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Role</MDBTypography>
                            <MDBCardText className="text-muted">{userData.role}</MDBCardText>
                          </MDBCol>
                      
                        </div>
                      </>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Profile;
