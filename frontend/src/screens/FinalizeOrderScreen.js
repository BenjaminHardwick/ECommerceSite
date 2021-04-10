import React, { useEffect } from 'react';
import { Button, Col, Row, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Checkout from '../components/Checkout';
import { createOrder } from '../actions/orderActions';
import { USER_INFO_RESET } from '../constants/userConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const FinalizeOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  // Calculation of the prices
  cart.productPrice = cart.cartItems.reduce(
    (i, product) => i + product.price * product.quantity,
    0
  );
  // Calulating the price for delivery.

  // If the final fee of the product is greater than 999 then the delivery fee will be discarded in the final price.
  cart.deliveryFee =
    cart.productPrice > 999 ? 0 : (cart.productPrice / 100).toFixed(2);

  cart.priceWithTax = Number((0.2 * cart.productPrice).toFixed(2));
  cart.priceWithTax = Math.round((cart.priceWithTax * 100) / 100).toFixed(2);

  cart.finalPrice =
    Number(cart.productPrice) +
    Number(cart.deliveryFee) +
    Number(cart.priceWithTax);
  cart.finalPrice = cart.finalPrice.toFixed(2);

  const newOrder = useSelector(state => state.newOrder);
  const { order, success, error } = newOrder;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_INFO_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  // On activation of placeOrderHandler, it will call OrderActions with order in the state passing all the information in createOrder

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderedProducts: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        productPrice: cart.productPrice,
        taxPrice: cart.priceWithTax,
        deliveryFee: cart.deliveryFee,
        totalPrice: cart.finalPrice,
      })
    );
  };
  return (
    <>
      <Checkout phase1 phase2 phase3 phase4 />
      <Row>
        <Col md={8}>
          <h2>Delivery</h2>
          <ListGroup>
            <ListGroup.Item variant="flush">
              <p>
                <strong>Address: </strong>
                {cart.deliveryAddress.address}, {cart.deliveryAddress.postCode},{' '}
                {cart.deliveryAddress.city}, {cart.deliveryAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item variant="flush">
              <h2>Payment Method</h2>
              <strong>Provider: {cart.paymentMethod}</strong>
            </ListGroup.Item>

            <ListGroup.Item variant="flush">
              <h2>Your Order</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart appears to be empty :( </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((product, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {' '}
                          <Image
                            src={product.image}
                            alt={product.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${product.product}`}>
                            {product.name}
                          </Link>
                        </Col>
                        <Col>
                          {product.quantity} x £{product.price} = £
                          {product.quantity * product.price}{' '}
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
                <Col>£{cart.productPrice}</Col>
              </Row>
            </ListGroup.Item>

            {cart.productPrice > 999 ? (
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
                  <Col>£{cart.deliveryFee}</Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col>Tax (20%)</Col>
                <Col>£{cart.priceWithTax}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>£{cart.finalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Pay and Complete
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default FinalizeOrderScreen;
