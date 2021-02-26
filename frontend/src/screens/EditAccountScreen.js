import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserInformation, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const EditAccountScreen = ({ match, history }) => {
  const userId = match.params.id;

  // Setting the states for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Dispatching
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdating,
    success: successfullyUpdated,
  } = userUpdate;
  // redirecting to create account
  // const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (successfullyUpdated) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userAccounts');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserInformation(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, history, successfullyUpdated, user]);

  // Dispatch a edit
  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userAccounts" className="btn btn-light my-3">
        Go back
      </Link>{' '}
      <FormContainer>
        <h1>Edit Account</h1>

        {loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Check
                type="checkbox"
                label="Is Admin?"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Save
            </Button>
            {errorUpdating && (
              <Message variant="danger">{errorUpdating}</Message>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditAccountScreen;
