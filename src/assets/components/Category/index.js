import React, { useEffect, useState } from "react";
import api from '../../../services/api';
import { useParams } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

function Category() {
  const [products, setProducts] = useState([]);
  const { catId } = useParams();
  
  useEffect(() => {
    api
      .get(`/products/category/${catId}`)
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [catId])


  return (
    <div>
      <h3>Category {catId} Selected</h3>
        {products.length > 0 ? (
          products.map((row, index) => {
            return (
              <div key={row.id}>
                <p>{row.name}</p>
                <p>{row.description}</p>
              </div>
            );
          })
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
    </div>
  );
}

export default Category;
