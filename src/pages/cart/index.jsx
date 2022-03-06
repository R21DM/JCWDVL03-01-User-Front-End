import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Col, Row, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { SIGN_IN } from "../../actions/types";

const URL = "http://localhost:8000";

function Cart() {
  //Redux state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //Variable Name
  const [editQty, setEditQty] = useState("");

  useEffect = () => {
    //Check user data
    const userId = user.id;
    const userName = user.username;

    console.log(userId);
    console.log(userName);
  };

  //Render webpage
  return (
    <div className="container cart-container py-2">
      <div>
        <h2>Cart Items</h2>
      </div>
      <div className="mx-auto d-flex flex-row py-1">
        <img className="img-cart" src="images/Adderall.jpg" />
        <Card className="w-80 mx-2" style={{ width: "90vw" }}>
          <Card.Body className="d-flex flex-row justify-content-between">
            <Card.Title>Adderall x1</Card.Title>
            <Card.Title>Rp 5.800,-</Card.Title>
            {editQty ? (
              <ButtonGroup className="me-2" aria-label="First group">
                <Button variant="secondary">+</Button>{" "}
                <Button variant="secondary">-</Button>{" "}
                <Button variant="secondary" onClick={() => setEditQty(false)}>
                  OK
                </Button>{" "}
                <Button variant="secondary" onClick={() => setEditQty(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            ) : (
              <Button variant="secondary" onClick={() => setEditQty(true)}>
                Edit
              </Button>
            )}
          </Card.Body>
        </Card>
        {editQty ? null : (
          <Button variant="primary" className="py-3 px-5">
            Delete
          </Button>
        )}
      </div>
      <br />
      <div>
        <Card border="secondary" className="mx-auto px-3 py-3 bg-light">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <h4>Checkout</h4>
              <Form.Label column sm="2">
                Total Price
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue="Rp 580.000,-"
                  className="fw-bold"
                />
              </Col>
            </Form.Group>
            <br />
            <h4>Address</h4>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Delivery Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter delivery address"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                City
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter city name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Postal Code / ZIP
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter postal code / ZIP"
                />
              </Col>
            </Form.Group>
          </Form>
          <br />
          <Button>Proceed to Payment</Button>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
