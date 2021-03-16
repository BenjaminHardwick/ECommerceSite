import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  // creating the data array
  //localStorage.removeItem('productDataArray');
  // fetch from local storage, if its empty create an empty array
  var productDataArray = localStorage.getItem('productDataArray') || [];

  function containsObject(obj, list) {
    // const hasValue = Object.values(list).includes("_id:" + obj);
    return JSON.stringify(list).includes(obj);
  }
  const storeInLocal = () => {
    // if the length is empty set the items inside the local storage to JSON

    if (productDataArray.length === 0) {
      localStorage.setItem(
        'productDataArray',
        JSON.stringify(productDataArray)
      );
      //console.log('empty array created in json');
    }

    // creating object to put in data array
    var productData = product;
    // add the productData as JSON
    var storedProductDataArray = JSON.parse(
      localStorage.getItem('productDataArray')
    );
    // step 1, if its empty add to [0] else add to the end

    if (!containsObject(product._id, JSON.parse(productDataArray))) {
      storedProductDataArray.push(JSON.stringify(productData));
      localStorage.setItem(
        'productDataArray',
        JSON.stringify(storedProductDataArray)
      );
    }

    // end result will look like a formatted JSON file this allows us to recommend and keep track of what users are looking at

    //var endResult = JSON.parse(localStorage.getItem('productDataArray'));
    //console.log(endResult);
  };
  //console.log(product.image);
  return (
    <div>
      <Card className="my-3 p-3 rounded" style={{ maxHeight: '350px' }}>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" onClick={storeInLocal} />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`} >
            <Card.Title as="div" onClick={storeInLocal}>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        </Card.Body>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card>
    </div>
  );
};

export default Product;
