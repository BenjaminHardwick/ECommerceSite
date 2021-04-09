import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';

const CookieScreen = () => {
  //console.log(brands[0]);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Shopping
      </Link>
      <Container>
        {' '}
        <h1>Our use of cookies and similar similar technologies in use</h1>
        <p style={{ fontSize: '18px' }}>
          Our platform use cookies and other technologies of the same category
          such as local storage to help provide a smoother experience throughout
          your time here, it also helps boost security. How you ask? We use
          cookies to help the experience here be unique to yourself. We help you
          login quicker, and see content that we think you would prefer.
        </p>
        <h1>What is a cookie? What is local Storage?</h1>
        <p style={{ fontSize: '18px' }}>
          Cookies are small files that are placed in your browser's storage. Not
          only do many mainstream sites use them, but they also help increase
          our services to you.
        </p>
        <p style={{ fontSize: '18px' }}>
          Local Storage is the industries standard technology, this allows a web
          application to store information locally on your device. We use local
          storage to help tailor the products you see specific to yourself. The
          more that you use our service, the more personal the platform will
          become to you.
        </p>
        <h1>Why do Hardwick's use these?</h1>
        <p>
          The usage of these technologies allows us to offer a more improved and
          measured experience to then user. More specifcally we use them for:
        </p>
        <ul>
          <li>
            <h3>Authentication and Security</h3>
            <ul>- To allow you to log in.</ul>
            <ul>- View user specific content.</ul>
            <ul> - Using JSON web tokens to authenticate your information</ul>
          </li>
          <li>
            <h3>Recommendation</h3>
            <ul>
              - We use your browsing history to show you content you've viewed.
            </ul>
            <ul>
              - By using the information you have browsed we will recommend
              products based from that.
            </ul>
          </li>
        </ul>
        <center>
          {' '}
          <Image
            src="/HARDWICKS_LOGO_BANNER.png"
            style={{ maxWidth: '15vw' }}
          ></Image>
        </center>
      </Container>
    </>
  );
};

export default CookieScreen;
