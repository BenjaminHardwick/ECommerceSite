import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductCategories } from '../actions/productActions';

const CategoryScreen = () => {
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const productCategory = useSelector(state => state.productCategory);
  const { loading, error, categories } = productCategory;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  //categories.forEach(item => console.log(item));
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
            <Col key={item} sm={12}>
              <ul>
                <Link to={`/category/${item}`}>
                  <Button
                    variant="submit"
                    onClick={e => setCategory(e.target.value)}
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

export default CategoryScreen;
