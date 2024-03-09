import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import style from '../type.module.css';

function Laptops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ecommerce-node4.vercel.app/products/category/656b5d1c7ef25cbb5771638a');
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loader} />
      ) : (
        <MDBRow className="g-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <MDBCol key={product._id}>
                <Link to={`/products/${product._id}`} className="text-decoration-none">
                  <MDBCard className="h-100">
                    {product.mainImage && product.mainImage.secure_url ? (
                      <MDBCardImage
                        src={product.mainImage.secure_url}
                        alt={product.name}
                        position="top"
                      />
                    ) : (
                      <MDBCardImage
                        src="fallback_image_url"
                        alt={product.name}
                        position="top"
                      />
                    )}
                    <MDBCardBody className="d-flex flex-column">
                      <div className={style.cardTitle}>
                        <MDBCardTitle>{product.name}</MDBCardTitle>
                        <MDBCardTitle className={style.price}>{product.price}$</MDBCardTitle>
                      </div>
                      <Link to="/cart">
                        <MDBBtn color="primary">Add To cart</MDBBtn>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                </Link>
              </MDBCol>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </MDBRow>
      )}
    </>
  );
}

export default Laptops;
