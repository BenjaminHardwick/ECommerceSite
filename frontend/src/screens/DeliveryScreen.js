import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Checkout } from '../components/Checkout';

import { deliveryAddressHandler } from '../actions/cartActions';
// Upon submitting the form, we are going to redirect the push to the payment screen...

const DeliveryScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { deliveryAddress } = cart;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postCode, setPostCode] = useState(deliveryAddress.postCode);
  const [country, setCountry] = useState(deliveryAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    //console.log('submit');
    dispatch(deliveryAddressHandler({ address, city, postCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <Checkout phase1 phase2 />
      <h1>Delivery Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Enter your Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Street name"
            value={address}
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City / Region</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your City / Region"
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postcode">
          <Form.Label>Enter your post code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your post code"
            value={postCode}
            onChange={e => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>{' '}
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryScreen;
