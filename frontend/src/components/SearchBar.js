import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';

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
        type="dropdown"
        name="q"
        onChange={e => setQuery(e.target.value)}
        placeholder="Find what you came for..."
        className=" dropdown mr-sm-3 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" classame="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
