import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/loginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PaymentScreen from './screens/PaymentScreen';
import FinalizeOrderScreen from './screens/FinalizeOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserAccountsScreen from './screens/UserAccountsScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import BrandScreen from './screens/BrandScreen';
import OrderLogbookScreen from './screens/OrderLogbookScreen';
import ProductByCategoryScreen from './screens/ProductByCategoryScreen';
import ProductByBrandScreen from './screens/ProductByBrandSceen';
import AboutScreen from './screens/AboutScreen';
import CookieScreen from './screens/CookieScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/admin/order-logbook" component={OrderLogbookScreen} />
          <Route path="/admin/userAccounts" component={UserAccountsScreen} />
          <Route path="/admin/users/:id/edit" component={EditAccountScreen} />
          <Route
            path="/admin/manage-products"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/manage-products/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={EditProductScreen} />
          <Route path="/brands" component={BrandScreen} />
          <Route path="/categories" component={CategoryScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/delivery" component={DeliveryScreen} />
          <Route path="/checkout" component={FinalizeOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/register" component={RegistrationScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route
            path="/category/:category"
            component={ProductByCategoryScreen}
            exact
          />
          <Route path="/brand/:brand" component={ProductByBrandScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/:page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/About" component={AboutScreen} exact />
          <Route path="/cookies" component={CookieScreen} exact />

          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
