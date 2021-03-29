import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import {
  listProductsByCategory,
} from '../actions/productActions';


const ProductByCategoryScreen = ({ match }) => {
  const category = match.params.category;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productByCategory = useSelector(state => state.productByCategory);
  const { loading, error, products } = productByCategory;

  useEffect(() => {
    dispatch(listProductsByCategory(category));
  }, [dispatch, category, pageNumber]);

  return (
    <>
      <MetaData />

      <h1>{category}</h1>
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

export default ProductByCategoryScreen;
