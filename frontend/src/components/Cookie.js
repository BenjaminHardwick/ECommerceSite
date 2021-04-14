import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
const Cookie = () => {
  const [show, setShow] = useState();

  let cookiePolicy = {
    agreed: true,
  };

  function isCookiesAllowed() {
    var result = JSON.parse(localStorage.getItem('acceptCookies')) || false;
    if (result == false) {
      return false;
    } else {
      return result.agreed;
    }
  }

  function acceptCookies(item) {
    localStorage.setItem('acceptCookies', JSON.stringify(item));
    setShow(false);
  }

  return (
    <>
      {isCookiesAllowed() ? (
        <></>
      ) : (
        <Alert show={show} variant="dark">
          <Alert.Heading>Our Cookie policy!</Alert.Heading>
          <p>
            This site uses your cookies, we abide by our{' '}
            <Link to="/cookies">cookie policy</Link> so that we can provide a
            better experience!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => acceptCookies(cookiePolicy)} variant="dark">
              Got it!
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
};

export default Cookie;
