import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Row,
  ListGroup,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderInformation, makePayment } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAYMENT_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderInformation = useSelector(state => state.orderInformation);

  const { order, loading, error } = orderInformation;

  const orderPayment = useSelector(state => state.orderPayment);
  // rename loading/success -> paymentLoading/paymentSucess
  const { success: paymentSuccess, loading: paymentLoading } = orderPayment;

  if (!loading) {
    const add = num => {
      return Math.round(num * 100) / 100;
    };

    order.productPrice = add(
      order.orderedProducts.reduce(
        (i, product) => i + product.price * product.quantity,
        0
      )
    );
    order.priceWithTax = add(order.productPrice * 0.2);
    order.finalPrice = add(order.productPrice + order.priceWithTax);
    order.deliveryFee = 15;
    order.finalPrice = order.finalPrice + order.deliveryFee;

    console.log(order.deliveryFee);
  }

  /// https://medium.com/@bolajifemi28/how-to-add-paypal-checkout-to-your-react-app-37d44c58a896

  useEffect(() => {
    const insertPayPal = async () => {
      const { data: clientID } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || paymentSuccess) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch(getOrderInformation(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        insertPayPal();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, paymentSuccess, orderId]);

  const paymentHandler = paymentResult => {
    console.log(paymentResult);
    // Updates database /api/order/:id -> isPaid? to true
    dispatch(makePayment(orderId, paymentResult));
    console.log('made payment');
  };

  // On activation of placeOrderHandler, it will call OrderActions with order in the state passing all the information in createOrder

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Your Order {order._id}</h1>{' '}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                {' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.deliveryAddress.address},{' '}
                {order.deliveryAddress.postCode}, {order.deliveryAddress.city},{' '}
                {order.deliveryAddress.country}
              </p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.isDelivered}
                  </Message>
                ) : (
                  <Message variant="danger">Currently being delivered</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Provider: {order.paymentMethod}</strong>
              <p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Payment incomplete</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderedProducts.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderedProducts.map((product, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${product.product}`}>
                            {product.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {product.quantity} x ${product.price} = $
                          {product.quantity * product.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Products</Col>
                <Col>£{order.productPrice}</Col>
              </Row>
            </ListGroup.Item>

            {order.productPrice > 999 ? (
              <ListGroup.Item>
                <Row>
                  <Col>Delivery Fee:</Col>
                  <Col>FREE</Col>
                </Row>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>
                {' '}
                <Row>
                  <Col>Delivery Fee:</Col>
                  <Col>£{order.deliveryFee.toPrecision(2)}</Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col>Tax (20%)</Col>
                <Col>£{order.priceWithTax}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>£{order.finalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {paymentLoading && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.finalPrice}
                    onSuccess={paymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
