import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../actions/cart-actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Cart() {
  //Declare navigate
  const navigate = useNavigate();
  const KEY = sessionStorage.getItem("key");
  const KEY2 = localStorage.getItem("token");

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
  const [itemCount, setItemCount] = useState(0);
  const [editMode, setEditMode] = useState(false);

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
    if (!KEY) {
      if (!KEY2) {
        return navigate("/");
      }
    }

    //Get cart data by user id
    if (KEY) {
      dispatch(getCartData(KEY));
    } else dispatch(getCartData(KEY2));

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

  //Edit cart item mode
  const editItem = (id) => {
    setEditMode(true);
    setEditableItem({
      ...editableItem,
      [id]: true,
    });

    const itemArrayID = cart.result.find((val) => {
      if (val.id == id) {
        return val;
      }
    });
    console.log(itemArrayID);
    setItemCount(itemArrayID.qty);
  };

  //Exit edit cart
  const exitEditMode = (id) => {
    setEditableItem({
      ...editableItem,
      [id]: false,
    });
    setEditMode(false);
  };

  //Delete cart item
  const deleteItem = (id) => {
    console.log(id);
    Axios.delete(API_URL + `/cart`, { params: { id } })
      .then((respond) => {
        console.log("Delete success", respond);
        if (KEY) {
          dispatch(getCartData(KEY));
        } else dispatch(getCartData(KEY2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update cart item
  const updateItemQty = (val) => {
    const newQty = itemCount + val;
    setItemCount(newQty);
  };

  //Confirm cart update
  const confirmUpdateCart = (id, qty) => {
    console.log(id, qty);

    Axios.patch(API_URL + `/cart`, { id, qty })
      .then((respond) => {
        console.log("Update success", respond);

        if (KEY) {
          dispatch(getCartData(KEY));
        } else dispatch(getCartData(KEY2));

        setEditableItem({
          ...editableItem,
          [id]: false,
        });

        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                {editableItem[cart_item.id] ? (
                  <>
                    <Card.Title>
                      {cart_item.name} x{itemCount}
                    </Card.Title>
                    <Card.Title>
                      Rp {(cart_item.price * itemCount).toLocaleString("in-ID")}
                      ,-
                    </Card.Title>
                  </>
                ) : (
                  <>
                    <Card.Title>
                      {cart_item.name} x{cart_item.qty}
                    </Card.Title>
                    <Card.Title>
                      Rp {cart_item.total_price.toLocaleString("in-ID")},-
                    </Card.Title>
                  </>
                )}
                {editableItem[cart_item.id] ? (
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        updateItemQty(1);
                      }}
                    >
                      +
                    </Button>{" "}
                    <Button
                      disabled={itemCount === 1 ? true : false}
                      variant="secondary"
                      onClick={() => {
                        updateItemQty(-1);
                      }}
                    >
                      -
                    </Button>{" "}
                    <Button
                      id={cart_item.id}
                      variant="secondary"
                      onClick={(e) => confirmUpdateCart(e.target.id, itemCount)}
                    >
                      OK
                    </Button>{" "}
                    <Button
                      id={cart_item.id}
                      variant="secondary"
                      onClick={(e) => exitEditMode(e.target.id)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    disabled={editMode}
                    id={cart_item.id}
                    variant="secondary"
                    onClick={(e) => editItem(e.target.id)}
                  >
                    Edit
                  </Button>
                )}
              </Card.Body>
            </Card>
            {editableItem[cart_item.id] ? null : (
              <Button
                disabled={editMode}
                id={cart_item.id}
                variant="primary"
                className="py-3 px-5"
                onClick={(e) => deleteItem(e.target.id)}
              >
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
          <div className="d-flex justify-content-between">
            <h2>Cart Items</h2>
            <div className="my-auto">
              <Link
                to="/history"
                className="text-dark"
              >{`Transaction History >>`}</Link>
            </div>
          </div>
          <div>{renderCartItems()}</div>
          <div className="d-flex justify-content-center py-2">
            <Pagination>
              <Pagination.Prev
                disabled={page === 1 ? true : false}
                onClick={() => setPage(page - 1)}
              />
              {items}
              <Pagination.Next
                disabled={page === endPageNumber ? true : false}
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
                    <h5 defaultValue="Rp NaN,-">{`Rp ${cart.totalPrice.toLocaleString(
                      "in-ID"
                    )},-`}</h5>
                  </Col>
                </Form.Group>
              </Form>
              <Button onClick={() => navigate("/payment")}>
                Checkout Items
              </Button>
            </Card>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column">
          <Image className="mx-auto fluid" src={`/images/empty-cart.png`} />
          <Link to="/product" className="mx-auto">
            <h4>Start shopping here</h4>
          </Link>

          <h4 className="mx-auto">
            {`or `}
            <Link to="/history">see your transaction history here</Link>
          </h4>
        </div>
      )}
    </div>
  );
}

export default Cart;
