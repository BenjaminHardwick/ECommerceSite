import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// By passing the phases of the checkout through props we are able to select each individual stage and display it in a nav above the checkout page, which
// gives some logical order to the user and also allows navigation throughout each step, in regards to the step you're on and the step before that.
export const Checkout = ({ phase1, phase2, phase3, phase4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {phase1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Login</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {phase2 ? (
          <LinkContainer to="/delivery">
            <Nav.Link>Delivery Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Delivery Address</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {phase3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Pay</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Pay</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {phase4 ? (
          <LinkContainer to="/checkout">
            <Nav.Link>Checkout</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Checkout</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default Checkout;
