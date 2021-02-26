import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
  const [queries, setQuery] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (queries.trim()) {
      history.push(`/search/${queries}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setQuery(e.target.value)}
        placeholder="Find what you came for..."
        className="mr-sm-3 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" classname="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
