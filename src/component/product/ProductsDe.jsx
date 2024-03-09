import{ useEffect, useState } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import style from './product.module.css';
import { useParams } from 'react-router-dom';

function ProductsDe() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ecommerce-node4.vercel.app/products/${productId}`);
        setProduct(response.data.product || {});
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      {loading ? (
        <div className={style.loader} />
      ) : (
        <MDBRow className={`g-4 ${style.productContainer}`}>
          {product && product._id ? (
            <>
              <MDBCol>
                <MDBCard className='mb-3'>
                  {product.mainImage && product.mainImage.secure_url ? (
                    <MDBCardImage src={product.mainImage.secure_url} alt={product.name} position='top' fluid />
                  ) : (
                    <img src="valid_fallback_image_url" alt={product.name} className={style.productImage} />
                  )}
                  <MDBCardBody>
                    <h2 className={style.productTitle}>{product.name}</h2>
                    <p className={style.productDescription}>{product.description}</p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard className='mb-3'>
                  <MDBCardBody>
                    <h5 className='card-title'>Reviews</h5>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div>
                        {product.reviews.map((review) => (
                          <MDBCard key={review._id} className='w-75 mb-3'>
                            <MDBCardBody>
                              <p>{review.comment}</p>
                              <p>Rating: {review.rating}</p>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                      </div>
                    ) : (
                      <p>No reviews yet</p>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          ) : (
            <p>No Details </p>
          )}
        </MDBRow>
      )}
    </>
  );
}

export default ProductsDe;

