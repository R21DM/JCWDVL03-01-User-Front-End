import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
  Form,
  InputGroup,
  FormControl,
  Modal,
  Spinner,
} from "react-bootstrap";
import "./style.css";
import { SIGN_IN } from "../../actions/types";

const API_URL = process.env.REACT_APP_API_URL;

function Product_Detail() {
  //Redux state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //Get data from query params
  const params = useParams();
  const id = params.id;

  //Product detail data
  const [product_name, setProduct_name] = useState("Null");
  const [product_price, setProduct_price] = useState("NaN");
  const [product_unit, setProduct_unit] = useState("unit");
  const [product_image, setProduct_image] = useState("");
  const [product_brand, setProduct_brand] = useState("Null");
  const [product_class, setProduct_class] = useState("Null");
  const [product_desc, setProduct_desc] = useState("Null");
  const [product_dosage, setProduct_dosage] = useState("Null");
  const [product_warning, setProduct_warning] = useState("Null");
  // const[(product, setProduct)] = setState({});

  //Set Loading & Modal
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addCart, setAddCart] = useState(false);

  //Loading & Modal Handler
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    //Check user
    console.log(user);

    //Load product details data
    Axios.get(API_URL + `/products/get`, { params: { id } })
      .then((res) => {
        console.log(res.data);
        setProduct_name(res.data[0].name);
        setProduct_price(res.data[0].price);
        setProduct_unit(res.data[0].unit);
        setProduct_brand(res.data[0].brand);
        setProduct_class(res.data[0].drug_class);
        setProduct_image(`${API_URL}/products/${res.data[0].name}.jpg`);
        setProduct_desc(res.data[0].description);
        setProduct_dosage(res.data[0].dosage);
        setProduct_warning(res.data[0].before_taking);
      })
      .catch((error) => console.log(error));
  }, []);

  //Order Quantity Handler
  const [order_qty, setOrder_qty] = useState(1);

  //Minus Product
  const subtract_1 = () => {
    setOrder_qty(order_qty - 1);
  };
  const subtract_10 = () => {
    setOrder_qty(order_qty - 10);
  };

  //Add Product
  const add_1 = () => {
    setOrder_qty(order_qty + 1);
  };
  const add_10 = () => {
    setOrder_qty(order_qty + 10);
  };

  //Add to Cart
  const addToCart = () => {
    //Cart Data
    const cartData = {
      userId: user.id,
      productId: id,
      qty: order_qty,
      price: product_price,
    };

    console.log(cartData);

    //POST data to back-end
    Axios.post(API_URL + "/cart", cartData)
      .then((respond) => {
        setAddCart(true);
        setLoading(false);
        setShowModal(true);
        console.log("respond", respond);
      })
      .catch((error) => {
        setAddCart(false);
        setLoading(false);
        setShowModal(true);
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {/* <!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> */}
        <script src="assets/js/jquery.min.js"></script>
        {/* <!-- Custom Theme files --> */}
        <link href="./style.css" rel="stylesheet" type="text/css" />
        {/* <!-- Custom Theme files --> */}
        {/* <!---- start-smoth-scrolling----> */}
        <script type="text/javascript" src="assets/js/move-top.js"></script>
        <script type="text/javascript" src="assets/js/easing.js"></script>
        {/* <!---- start-smoth-scrolling----> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!----webfonts---> */}
        <link
          href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic"
          rel="stylesheet"
          type="text/css"
        />
        {/* <!---//webfonts---> */}
      </div>
      <div>
        {/* <!----container----> */}
        <div
          className="container bg-primary"
          style={{ marginTop: "12%" }}
        ></div>
        {/* <!----content----> */}
        <div className="content">
          <div className="container">
            <div className="products"></div>
          </div>
          <div className="clearfix"> </div>
          {/* <!----product-details---> */}
          <div className="product-details">
            <div className="container">
              <div className="product-details-row1">
                <div className="product-details-row1-head">
                  <h2>{product_name}</h2>
                  <p>
                    <strong>Generic name: </strong>
                    {product_name}
                  </p>
                  <p>
                    <strong>Brand name: </strong>
                    {product_brand}
                  </p>
                  <p>
                    <strong>Drug class: </strong>
                    {product_class}
                  </p>
                </div>
                <div className="product-filter-grids d-flex flex-row">
                  <div className="d-flex w-50 flex-column justify-content-center align-items-center mx-2">
                    <Image
                      className="fluid rounded w-100 h-100 mt-4 mb-2"
                      src={product_image}
                      onError={() => setProduct_image(`images/liquid.jpg`)}
                    />
                    <div className="product-cart-share w-100">
                      <ul className="product-share text-right">
                        <h3 className="d-flex justify-content-start">
                          Share This:
                        </h3>
                        <Image src="/assets/img/social-share.png" />
                      </ul>
                    </div>
                  </div>
                  <div className="product-price w-50">
                    <div className="product-price-left text-right w-100">
                      <h3>Current Price</h3>
                      <h5>
                        Rp {product_price.toLocaleString("in-ID")},-/
                        {product_unit}
                      </h5>
                    </div>
                    <div className="product-price-details">
                      <p className="text-right">{product_desc}</p>
                      {/* Add To Cart */}
                      {user.id ? (
                        <>
                          <div className="d-flex flex-row w-100 bg-dark">
                            <div className="mx-2 my-2 d-flex w-100 justify-content-center">
                              <div className="d-flex flex-column align-items-center">
                                <div className="text-info mb-1">Quantity</div>
                                <div className="d-flex flex-row">
                                  <ButtonGroup
                                    className="py-4"
                                    aria-label="Subtraction"
                                  >
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => subtract_10()}
                                      disabled={order_qty <= 10 ? true : false}
                                    >
                                      -10
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => subtract_1()}
                                      disabled={order_qty <= 1 ? true : false}
                                    >
                                      -
                                    </Button>
                                  </ButtonGroup>
                                  <Form>
                                    <Form.Group
                                      className="mb-3 mx-2 text-info d-flex flex-column align-items-center"
                                      controlId="exampleForm.ControlInput1"
                                    >
                                      <InputGroup>
                                        <FormControl
                                          type="text"
                                          placeholder="1"
                                          value={order_qty}
                                          readOnly
                                        />
                                        <InputGroup.Text id="basic-addon">
                                          {product_unit}
                                        </InputGroup.Text>
                                      </InputGroup>
                                      <InputGroup>
                                        <InputGroup.Text id="total-price">
                                          Rp
                                        </InputGroup.Text>
                                        <FormControl
                                          type="text"
                                          placeholder="Total Price"
                                          value={
                                            (
                                              order_qty * product_price
                                            ).toLocaleString("in-ID") + ",-"
                                          }
                                          readOnly
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Form>
                                  <ButtonGroup
                                    className="py-4"
                                    aria-label="Addition"
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() => add_1()}
                                    >
                                      +
                                    </Button>
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => add_10()}
                                    >
                                      +10
                                    </Button>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="add-cart-btn d-flex py-3 justify-content-center bg-dark">
                            <Button
                              variant="danger"
                              className="d-flex flex-column mx-1 px-5"
                              onClickCapture={addToCart}
                              disabled={loading}
                              onClick={() => setLoading(true)}
                            >
                              {loading ? (
                                <div className="d-flex mx-3">
                                  <Spinner animation="border" variant="light" />
                                </div>
                              ) : (
                                <>
                                  <Image
                                    className="d-flex fluid center"
                                    src="/assets/img/cart-icon.png"
                                    alt="add-to-cart"
                                  />
                                  Add to Cart
                                </>
                              )}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="danger"
                          className="d-flex flex-row w-100 mx-auto my-auto justify-content-center align-items-center"
                          onClick={() => dispatch({ type: SIGN_IN })}
                        >
                          <Image
                            className="fluid"
                            src="/assets/img/cart-icon.png"
                          />
                          <h4 className="text-light my-auto">Start Shopping</h4>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="clearfix"> </div>
              </div>
              <div className="product-tabs bg-light mb-3 px-3 py-3">
                {/* <!--Horizontal Tab--> */}
                <Tabs defaultActiveKey="warning" id="tabs" className="mb-3">
                  <Tab eventKey="warning" title="Warning">
                    <div>
                      <p>{product_warning}</p>
                    </div>
                  </Tab>
                  <Tab eventKey="dosage" title="Dosage">
                    <div className="product-fea">
                      <p>{product_dosage}</p>
                    </div>
                  </Tab>
                  <Tab eventKey="side-effects" title="Side Effects">
                    <div>
                      <p>
                        Get emergency medical help if you have signs of an
                        allergic reaction: hives; chest tightness, difficult
                        breathing; feeling like you might pass out; swelling of
                        your face, lips, tongue, or throat.
                      </p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        {/* <!----container----> */}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {addCart ? (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Product Added to Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>This product have been added to your cart.</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sorry, something went wrong.</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Product_Detail;
