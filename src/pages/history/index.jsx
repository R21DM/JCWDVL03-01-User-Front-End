import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Pagination, Image } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

function History() {
  //Declare navigate
  const navigate = useNavigate();
  //Redux state
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  //Variable Name
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 5;
  const endPageNumber = Math.ceil(history.length / itemPerPage);
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
    Axios.get(API_URL + "/history", { params: { id: user.id } })
      .then((respond) => {
        console.log(respond);
        setHistory(respond.data);
        console.log(history);
      })
      .catch((err) => console.log(err));

    //Check user data
    console.log("user:", user);
  }, []);

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderHistoryTransaction = () => {
    return history
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((txn_item) => {
        return (
          <div id={txn_item.id} className="mx-auto d-flex flex-row py-1">
            <Card className="w-80 mx-2" style={{ width: "90vw" }}>
              <Card.Body className="d-flex flex-row justify-content-between">
                <Card.Title>
                  {txn_item.code} - {txn_item.status}
                </Card.Title>
                <Card.Title>{`Rp ${txn_item.total_price.toLocaleString(
                  "in-ID"
                )},-`}</Card.Title>
                <Button
                  id={txn_item.id}
                  onClick={(e) => navigate(`/history/${e.target.id}`)}
                >
                  Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      });
  };

  //Render webpage
  return (
    <div className="container history-container py-2">
      {history.length ? (
        <>
          <div>
            <div className="d-flex justify-content-between">
              <h2>Transaction History</h2>
              <div className="my-auto">
                <Link to="/cart" className="text-dark">{`Cart >>`}</Link>
              </div>
            </div>
            <div>{renderHistoryTransaction()}</div>
          </div>
          <div className="center-item">
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
        </>
      ) : (
        <>
          <Image
            className="center-item mx-auto fluid"
            src={`/images/transaction-history.png`}
          />
          <div className="center-item fs-4">
            You have no transaction history
          </div>
          <div className="center-item py-2">
            <Link to="/">Back to homepage</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default History;
