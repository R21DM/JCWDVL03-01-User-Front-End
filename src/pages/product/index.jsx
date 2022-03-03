import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/product-actions";
import { Button, Card } from "react-bootstrap";
import "../product/style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Product(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return {
      products: state.products.data,
    };
  });
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(API_URL + `/products/get`)
      .then((respond) => {
        // console.log(respond.data);
        dispatch(getProducts(""));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderListProducts = () => {
    console.log("Productnya", products);
    return products.map((product) => {
      return (
        <Card key={product.id} id="product-card">
          {/* <Card.Img variant="top" src={product.images[0]} /> */}
          <Card.Body className="card-body">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {"Rp. "}
              {product.price}
              {`/${product.unit}`}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => navigation(`/detail?id=${product.id}`)}
            >
              Check Details
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        {/* --------------------------- Product  ------------------------------*/}

        <div className="product-container">
          <div className="body-feature-product">{renderListProducts()}</div>
        </div>
      </main>
    </div>
  );
}

export default Product;
