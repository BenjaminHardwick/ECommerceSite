import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductBrands } from '../actions/productActions';

const BrandScreen = () => {
  const dispatch = useDispatch();
  const productBrands = useSelector(state => state.productBrands);
  const { loading, error, brands } = productBrands;
  useEffect(() => {
    dispatch(listProductBrands());
  }, [dispatch]);
  //console.log(brands[0]);
  return (
    <div>
      <h1>Brands</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {brands.map(item => (
            <Col key={item.brand} sm={12} md={12} lg={12} xl={12}>
              {item.brand}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BrandScreen;
