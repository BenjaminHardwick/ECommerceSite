import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductCategories } from '../actions/productActions';

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const productCategory = useSelector(state => state.productCategory);
  const { loading, error, categories } = productCategory;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  //console.log(categories[0]);
  return (
    <div>
      <h1>Categories</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {categories.map(item => (
            <Col key={item.category} sm={12} md={12} lg={12} xl={12}>
              {item.category}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CategoryScreen;
