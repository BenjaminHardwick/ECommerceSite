import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';
const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id;

  // Setting the states for registration
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [imageUploadStatus, setImageUploadStatus] = useState(false);

  // Dispatching
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccessful,
  } = productUpdate;

  // redirecting to create account
  // const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (updateSuccessful) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/manage-products');
    } else {
      if (!product.name || productId !== product._id) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, history, product, updateSuccessful]);

  const uploadImageHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setImageUploadStatus(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/imgUploads', formData, config);

      setImage(data);
      setImageUploadStatus(false);
    } catch (error) {
      console.error(error);
      setImageUploadStatus(false);
    }
  };

  // Dispatch a edit
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  return (
    <>
      <Link to="/admin/manage-products" className="btn btn-light my-3">
        Go back
      </Link>{' '}
      <FormContainer>
        <h1>Edit Products</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the image url"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Select Images"
                custom
                onChange={uploadImageHandler}
              >
                {imageUploadStatus && <Loader />}
              </Form.File>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Amount In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Save
            </Button>
            {error && <Message variant="danger">{error}</Message>}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditProductScreen;
