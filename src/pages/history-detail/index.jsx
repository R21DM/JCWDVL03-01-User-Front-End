import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Image } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
const KEY = sessionStorage.getItem("key");
const KEY2 = localStorage.getItem("token");

function History_Detail() {
  const navigate = useNavigate();
  //Redux state
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  //Get data from query params
  const params = useParams();
  const id = params.id;

  //Variable Name
  const [history, setHistory] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (!KEY) {
      if (!KEY2) {
        return navigate("/");
      }
    }

    Axios.get(API_URL + `/history/${id}`)
      .then((respond) => {
        console.log(respond);
        setHistory(respond.data);
        setShipping(respond.data[0].shipping);
        setTotalPrice(respond.data[0].total_price);
        //Set shipping price
        switch (respond.data[0].shipping) {
          case "Regular":
            setShippingPrice(5000);
            return;
          case "Same Day":
            setShippingPrice(10000);
            return;
          case "Instant":
            setShippingPrice(20000);
            return;
          default:
            setShippingPrice(5000);
        }
      })
      .catch((err) => console.log(err));

    //Check user data
    console.log("user:", user);
  }, []);

  const renderHistoryDetail = () => {
    return history.map((txn_item) => {
      return (
        <div className="d-flex justify-content-between">
          <div className="fs-5">
            {txn_item.name} x {txn_item.qty} @ Rp{" "}
            {txn_item.price.toLocaleString("in-ID")},-
          </div>
          <div className="fs-5">{`Rp ${(
            txn_item.price * txn_item.qty
          ).toLocaleString("in-ID")},-`}</div>
        </div>
      );
    });
  };

  //Render webpage
  return (
    <div className="container history-container py-2 bg-light mb-2">
      <div className="d-flex justify-content-between">
        <h2>Transaction Details</h2>
        <div className="my-auto">
          <Link
            to="/history"
            className="text-dark"
          >{`Transaction History >>`}</Link>
        </div>
      </div>
      <div className="mx-auto d-flex flex-row py-1">
        <div className="w-80 mx-2" style={{ width: "90vw" }}>
          <>{renderHistoryDetail()}</>
          <div className="d-flex justify-content-between">
            <div className="fs-5">Shipping - {shipping}</div>
            <div className="fs-5">{`Rp ${shippingPrice.toLocaleString(
              "in-ID"
            )},-`}</div>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <div className="fs-5">Total Price</div>
            <div className="fs-5">{`Rp ${totalPrice.toLocaleString(
              "in-ID"
            )},-`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History_Detail;
