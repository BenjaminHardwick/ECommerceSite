import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <footer class="footer-bs">
      <div class="row">
        <div class="col-md-3 footer-brand animated fadeInLeft">
          <Image
            src="/HARDWICKSLOGOWHITE.png"
            style={{ height: '65px', width: '145px' }}
          />
          <br />
          <p>
            Our focus at Hardwicks is to ensure the consumer is able to have a
            great experience. Safely and securely, finding the products you need
            and being recommended the products of high rating.
          </p>
          <p>&copy; 2021 Hardwicks, All rights reserved</p>
        </div>
        <div class="col-md-4 footer-nav animated fadeInUp">
          <h4>Menu —</h4>
          <div class="col-md-6">
            <ul class="pages">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/categories">Categories</a>
              </li>
              <li>
                <a href="/brands">Brands</a>
              </li>
              {userInfo ? (
                <li>
                  <a href="/Profile">Your Profile</a>
                </li>
              ) : (
                <li>
                  <a href="/login">Login</a>
                </li>
              )}
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="mailto:benjaminjosephhardwick@gmail.com">Contacts</a>
              </li>
              <li>
                <a href="/cookies">Cookie Policy</a>
              </li>
              <li>
                <a href="https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted">
                  Data Protection Act
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 footer-social animated fadeInDown">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
