import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import MetaData from '../components/MetaData';
import {
  listProducts,
  listProductsByCategory,
} from '../actions/productActions';
import BestProductsCarousel from '../components/BestProductsCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;
  const itemsInLocal =
    JSON.parse(localStorage.getItem('productDataArray')) || [];

  const productByCategory = useSelector(state => state.productByCategory);
  const {
    loading: productCategoryLoading,
    error: categoryError,
    products: productByCategories,
  } = productByCategory;

  function getRandomInt() {
    var max = itemsInLocal.length;
    return Math.floor(Math.random() * (max - 1 - 1 + 1) + 1);
  }
  const categories = requestCategoryRecommendation();
  function requestCategoryRecommendation() {
    var productOfChoice = getRandomInt();
    if (browsingHistory() == true) {
      // console.log('random int chosen= ', productOfChoice);
      //console.log(JSON.parse(itemsInLocal[productOfChoice]))
      let recommended = JSON.parse(itemsInLocal[productOfChoice]);
      var category = recommended.category;
      return category;
    } else {
    }
  }

  function browsingHistory() {
    if (itemsInLocal === null) {
      return false;
    } else {
      if (itemsInLocal.length <= 2) {
        return false;
      } else {
        return true;
      }
    }
  }
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    if (browsingHistory()) {
      dispatch(listProductsByCategory(categories));
    }
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <MetaData />
      {!keyword ? (
        <BestProductsCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back
        </Link>
      )}

      <h1>Lastest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col
                className="align-items-stretch d-flex"
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}

      {!browsingHistory() ? (
        <></>
      ) : productCategoryLoading ? (
        <Loader />
      ) : categoryError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>We thought you would like</h3>
          <Row>
            {productByCategories.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      {browsingHistory() && (
        <>
          <h2>Your Browsing History</h2>
          <div className="row row-horizon">
            <div className="d-flex flex-row flex-nowrap overflow-auto">
              {itemsInLocal.map(product => (
                <div className="content">
                  <Product product={JSON.parse(product)} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
