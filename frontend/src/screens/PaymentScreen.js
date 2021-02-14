import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Checkout } from '../components/Checkout';
import { Col } from 'react-bootstrap';

import { paymentMethodHandler } from '../actions/cartActions';
// Upon submitting the form, we are going to redirect the push to the payment screen...

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { deliveryAddress } = cart;
  // Should there be no delivery address redirect the client back to the delivery page
  if (!deliveryAddress) {
    history.push('/delivery');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    console.log('submit');
    dispatch(paymentMethodHandler(paymentMethod));
    history.push('/checkout');
  };

  return (
    <FormContainer>
      <Checkout phase1 phase2 phase3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Choose preferred payment method</Form.Label>
        </Form.Group>
        <Col>{/* TODO: ADD OTHER PAYMENT METHODS HOWEVER PAYPAL CAN HANDLE ALL TYPES OF CARDS W/O AN ACCOUNT
          <Form.Check
            type="radio"
            label="Visa"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type="radio"
            label=" Visa Debit Card"
            id="Visa"
            name="paymentMethod"
            value="Visa"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
        ></Form.Check>*/}
          <Form.Check
            type="radio"
            label="PayPal or Credit/Debit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>

        <Button type="submit" variant="primary">
          Finalize payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
