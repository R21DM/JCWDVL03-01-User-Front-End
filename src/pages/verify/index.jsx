import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const URL = process.env.REACT_APP_API_URL;

const Verify = () => {
  //Get data from query params
  const query_param = useLocation();
  const params = new URLSearchParams(query_param.search);
  const username = params.get("username");
  const token = params.get("token");

  //Error state
  const [errorVerification, setErrorVerification] = useState(false);

  useEffect(() => {
    console.log(username);
    console.log(token);
  }, []);

  //Checking registration token
  Axios.get(URL + "/verify", {
    params: {
      username,
      token,
    },
  })
    .then((res) => {
      console.log(res.status, "Verification Success");
    })
    .catch((error) => {
      setErrorVerification(true);
      console.log(error);
    });

  return (
    <div>
      <div className="verification-container">
        <div className="verification-notification center-item">
          {errorVerification ? (
            <div>
              <h2 className="mx-auto center-item text-danger">
                Verification Failed!
              </h2>
              <p className="mx-auto verification-font-1 text-danger">
                Sorry we are unable to verify your account.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="mx-auto center-item text-success">
                Verification Success!
              </h2>
              <p className="mx-auto verification-font-1 text-success">
                Thank you {username} for verifying your account.
              </p>
            </div>
          )}
          <Link to="/" className="mx-auto verification-font-2">
            Click here to return to home page.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
