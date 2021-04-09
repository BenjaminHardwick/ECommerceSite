import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';

const AboutScreen = () => {
  //console.log(brands[0]);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Shopping
      </Link>
      <Container>
        {' '}
        <h1>About Us</h1>
        <p style={{ fontSize: '18px' }}>
          Here at Hardwick's , the customer is the single most important
          individual we care about. Ensuring that our platform gives the best
          possible experience to allow your purchase to be fulfilled and
          delivered on time.
        </p>
        <center>
          {' '}
          <Image src="/HARDWICKS_LOGO.png" style={{ maxWidth: '30vw' }}></Image>
        </center>
        <h1>Delivery Information</h1>
        <p style={{ fontSize: '18px' }}>
          Orders over £1,000 will recieve free delivery. Orders under £1,000
          will have a delivery fee of 1% of their total cost (excl. VAT).
        </p>
      </Container>
    </>
  );
};

export default AboutScreen;
