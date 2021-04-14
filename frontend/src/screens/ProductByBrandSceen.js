import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { listProductsByBrand } from '../actions/productActions';

const ProductByBrandScreen = ({ match }) => {
  const brand = match.params.brand;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productByBrand = useSelector(state => state.productByBrand);
  const { loading, error, products } = productByBrand;


  useEffect(() => {
    dispatch(listProductsByBrand(brand));
  }, [dispatch, brand, pageNumber]);

  return (
    <>
      <MetaData />

      <h1>{brand}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ProductByBrandScreen;
