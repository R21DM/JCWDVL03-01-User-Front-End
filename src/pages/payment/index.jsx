import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Col, Row, Spinner, Modal } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_URL = process.env.REACT_APP_LOCAL_URL;

function Payment() {
  //Declare navigate
  const navigate = useNavigate();
  const KEY = sessionStorage.getItem("key");
  //Redux state
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
  const [deliveryFee, setDeliveryFee] = useState(5000);
  const [delivery, setDelivery] = useState("Regular");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [loading, setLoading] = useState(false);
  const [selectFile, setSelectFile] = useState();
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    if (!KEY) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(address, city, zip);
    console.log(selectFile);
  }, [address, city, zip, selectFile]);

  //Event handlers
  const onHandleAddress = (event) => {
    let value = event.target.value;
    setAddress(value);
  };

  const onHandleCity = (event) => {
    let value = event.target.value;
    setCity(value);
  };

  const onHandleZip = (event) => {
    let value = event.target.value;
    setZip(value);
  };

  const handleClose = () => {
    setShowModal(false);

    setLoading(false);

    navigate("/");
  };

  //On file upload
  const onFileUpload = () => {
    const dataArray = new FormData();
    dataArray.append("uploaded-file", selectFile);
    dataArray.append("filename", selectFile.name);

    console.log(dataArray);

    Axios.post(ADMIN_URL, dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { id: KEY },
    })
      .then((respond) => {
        console.log("Respond", respond);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  //Set Delivery Fee
  const changeFee = (val) => {
    console.log(val);
    switch (val) {
      case "1":
        setDeliveryFee(5000);
        setDelivery("Regular");
        console.log("set to", val);
        return;
      case "2":
        setDeliveryFee(10000);
        setDelivery("Same Day");
        console.log("set to", val);
        return;
      case "3":
        setDeliveryFee(20000);
        setDelivery("Instant");
        console.log("set to", val);
        return;
      default:
        setDeliveryFee(5000);
        setDelivery("Regular");
        return;
    }
  };

  //Post Order
  const postOrder = () => {
    setLoading(true);

    const orderData = {
      id: KEY,
      total: cart.totalPrice + deliveryFee,
      address,
      city,
      zip: Number(zip),
      delivery,
    };

    console.log(orderData);

    //POST invoice
    Axios.post(API_URL + "/payment", orderData)
      .then((respond) => {
        console.log("respond", respond);
      })
      .catch((error) => console.log(error));

    //POST Payment Proof
    onFileUpload();

    setShowModal(true);
  };

  //Render webpage
  return (
    <div className="container payment-container py-2">
      <div>
        <Card border="secondary" className="mx-auto px-3 py-3 bg-light">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <h4>Checkout</h4>
              <Form.Label column sm="2">
                Total Cart
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
                  onChange={onHandleAddress}
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
                <Form.Control
                  onChange={onHandleCity}
                  type="text"
                  placeholder="Enter city name"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Postal Code / ZIP
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  onChange={onHandleZip}
                  type="number"
                  placeholder="Enter postal code / ZIP"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Delivery
              </Form.Label>
              <Col sm="10">
                <Form.Select onClick={(e) => changeFee(e.target.value)}>
                  <option value={1}>Regular delivery (3 - 5 days)</option>
                  <option value={2}>Same day delivery (1 - 2 days)</option>
                  <option value={3}>Instant (3 - 5 hours)</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Delivery Fee
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  disabled
                  type="text"
                  value={`Rp ${deliveryFee.toLocaleString("in-ID")},-`}
                />
              </Col>
            </Form.Group>
            <br />
            <h4 className="center-item">{`Total Price : Rp ${(
              cart.totalPrice + deliveryFee
            ).toLocaleString("in-ID")},-`}</h4>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Payment Proof
              </Form.Label>
              <Col sm="10">
                <input
                  name="uploaded-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectFile(e.target.files[0])}
                />
              </Col>
            </Form.Group>
          </Form>
          <br />
          <Button
            disabled={!address || !city || !zip || !selectFile || loading}
            onClick={() => {
              postOrder();
            }}
          >
            {loading ? <Spinner animation="border" /> : `Proceed to Payment`}
          </Button>
        </Card>
      </div>
      <Modal show={showModal} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for your purchase!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please kindly wait while we process your order.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
