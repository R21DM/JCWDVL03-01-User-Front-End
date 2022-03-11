import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  ButtonGroup,
  Pagination,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../actions/cart-actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Cart() {
  //Redux state
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    return {
      cart: state.cart.data,
    };
  });
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  //Variable Name
  const [page, setPage] = useState(1);
  const [editableItem, setEditableItem] = useState({});
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 3;
  const endPageNumber = Math.ceil(cart.result.length / itemPerPage);
  for (let number = 1; number <= endPageNumber; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    //Get cart data by user id
    dispatch(getCartData(user.id));

    //Check user data
    console.log("cart:", cart);
    console.log("user:", user);
  }, []);

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderCartItems = () => {
    return cart.result
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((cart_item) => {
        return (
          <div id={cart_item.id} className="mx-auto d-flex flex-row py-1">
            <img
              className="img-cart"
              src={`${API_URL}/products/${cart_item.name}.jpg`}
            />
            <Card className="w-80 mx-2" style={{ width: "90vw" }}>
              <Card.Body className="d-flex flex-row justify-content-between">
                <Card.Title>
                  {cart_item.name} x{cart_item.qty}
                </Card.Title>
                <Card.Title>
                  Rp {cart_item.total_price.toLocaleString("in-ID")},-
                </Card.Title>
                {editableItem[cart_item.id] ? (
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="secondary">+</Button>{" "}
                    <Button variant="secondary">-</Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditableItem({
                          ...editableItem,
                          [cart_item.id]: false,
                        })
                      }
                    >
                      OK
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditableItem({
                          ...editableItem,
                          [cart_item.id]: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setEditableItem({
                        ...editableItem,
                        [cart_item.id]: true,
                      })
                    }
                  >
                    Edit
                  </Button>
                )}
              </Card.Body>
            </Card>
            {editableItem[cart_item.id] ? null : (
              <Button variant="primary" className="py-3 px-5">
                Delete
              </Button>
            )}
          </div>
        );
      });
  };

  //Render webpage
  return (
    <div className="container cart-container py-2">
      {cart.totalPrice ? (
        <>
          <div>
            <h2>Cart Items</h2>
          </div>
          <div>{renderCartItems()}</div>
          <div className="d-flex justify-content-center py-2">
            <Pagination>
              <Pagination.Prev
                disabled={page == 1 ? true : false}
                onClick={() => setPage(page - 1)}
              />
              {items}
              <Pagination.Next
                disabled={page == endPageNumber ? true : false}
                onClick={() => setPage(page + 1)}
              />
            </Pagination>
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
                      defaultValue="Rp NaN,-"
                      className="fw-bold"
                      value={`Rp ${cart.totalPrice.toLocaleString("in-ID")},-`}
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
        </>
      ) : (
        <div className="d-flex flex-column">
          <Image className="mx-auto fluid" src={`/images/empty-cart.png`} />
          <Link to="/product" className="mx-auto">
            <h4>Start shopping here</h4>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
