import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import {
  createProductReview,
  listProductDetails,
  listProductsByRecommendations,
} from '../actions/productActions';
import Message from '../components/Message';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Product from '../components/Product';
import MetaData from '../components/MetaData';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  const [quantity, setquantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(' ');
  const clearCachedInformation = () => {
    localStorage.clear('productDataArray');
  };
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productKNNRecommended = useSelector(
    state => state.productKNNRecommended
  );
  const {
    loading: recommendationLoading,
    error: recommendationError,
    recommended,
  } = productKNNRecommended;
  console.log(recommended);

  const productNewReview = useSelector(state => state.productNewReview);
  const {
    loading: loadingReview,
    success: newReviewSuccess,
    error: newReviewError,
  } = productNewReview;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const itemsInLocal =
    JSON.parse(localStorage.getItem('productDataArray')) || [];
  console.log('items in local' + itemsInLocal);
  //console.log("items in local spreaded" + [...itemsInLocal]);

  useEffect(() => {
    if (newReviewSuccess) {
      alert('Review has been submitted');
      setRating(0);
      setComment(' ');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(listProductsByRecommendations(match.params.id));
    }
    //dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, newReviewSuccess, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  function browsingHistory() {
    if (itemsInLocal === null) {
      return false;
    } else {
      if (itemsInLocal.length <= 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  function recommendProducts() {
    if (recommended === null) {
      return false;
    } else {
      if (recommended.length <= 1) {
        return false;
      } else {
        return true;
      }
    }
  }
  const submitHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
    console.log(rating);
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Link
        className="btn btn-light my-3"
        to="/"
        onClick={clearCachedInformation}
      >
        Clear Recent Viewed
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <MetaData
            title={product.name}
            description={product.description}
            keyword={product.category}
          />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>£{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? 'In Stock'
                          : 'Currently Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={e => setquantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {recommendProducts() &&
            (recommendationLoading ? (
              <Loader />
            ) : recommendationError ? (
              <Message variant="danger">{recommendationError}</Message>
            ) : (
              <>
                <h2>People also looked for</h2>
                <div className="row row-horizon">
                  <div className="d-flex flex-row flex-nowrap overflow-auto">
                    {recommended.map(product => (
                      <div className="content">
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}

          {browsingHistory() && (
            <>
              <h2>Recently Viewed</h2>
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

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>Be the first to review!</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Would you like to leave a review?</h2>
                  {loadingReview && <Loader />}
                  {newReviewError && <Message>{newReviewError}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="0">Select...</option>
                          <option value="1">1 - Awful</option>
                          <option value="2">2 - Not Good</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Outstanding!</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="4"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">Login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
