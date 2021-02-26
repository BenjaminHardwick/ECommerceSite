import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  createProduct,
  listProducts,
  removeProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productRemove = useSelector(state => state.productRemove);
  const {
    loading: loadingProductRemove,
    error: removingProductError,
    success: productSuccessfullyDeleted,
  } = productRemove;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingNewProduct,
    error: createProductError,
    success: productSuccessfullyCreated,
    product: newProduct,
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      // console.log('none admin user detected');
      history.push('/login');
    }
    if (productSuccessfullyCreated) {
      history.push(`/admin/product/${newProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    productSuccessfullyDeleted,
    productSuccessfullyCreated,
    newProduct,
    pageNumber,
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      //console.log('removed');
      // todo delete product
      dispatch(removeProduct(id));
    }
  };
  const createNewProductHandler = () => {
    // create product
    dispatch(createProduct());
  };
  //const { } = productCreate

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createNewProductHandler}>
            <i className="fas fa-plus">NEW PRODUCT</i>
          </Button>
        </Col>
      </Row>
      {loadingNewProduct && <Loader />}
      {createProductError && (
        <Message variant="danger">{createProductError}</Message>
      )}
      {loadingProductRemove && <Loader />}
      {removingProductError && (
        <Message variant="danger">{removingProductError}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin="true" />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
