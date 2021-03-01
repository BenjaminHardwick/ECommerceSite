import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductBrands } from '../actions/productActions';

const BrandScreen = () => {
  const [brand, setBrand] = useState('');
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
            <Col key={item} sm={12}>
              <ul>
                <Link to={`/brand/${item}`}>
                  <Button
                    variant="submit"
                    onClick={e => setBrand(e.target.value)}
                  >
                    {item}
                  </Button>
                </Link>
              </ul>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BrandScreen;
