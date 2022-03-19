import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { SIGN_IN } from "../../actions/types";

const URL = process.env.REACT_APP_API_URL;

function Register() {
  //Redux state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  //Variable Name
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");

  //Show Modal & Modal Handler
  const [showModal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
    navigate("/");
  };
  const handleShowModal = () => setModal(true);

  //Error state
  const [errorUsername, setErrorUsername] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorConfirm, setErrorConfirm] = useState(true);
  const [errorPhone, setErrorPhone] = useState(true);
  const [errorRegistration, setErrorRegistration] = useState(false);

  //Event handlers
  const onHandleUsername = (event) => {
    let value = event.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const onHandleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const onHandlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const onHandleConfirm = (event) => {
    let value = event.target.value;
    setConfirm(value);
    validateConfirm(value);
  };

  const onHandlePhone = (event) => {
    let value = event.target.value;
    setPhone(value);
    validatePhone(value);
  };

  //Clear Input Form
  const clearInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setPhone("");
  };

  // Validation
  const validateUsername = (username) => {
    //Username checking
    const length = username.length;
    if (!length) {
      setErrorUsername(true);
      return;
    }
    //Username is valid
    console.log("Username OK");
    setErrorUsername(false);
  };

  const validateEmail = (email) => {
    //Email validation
    let validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!validation.test(email)) {
      console.log("Email not valid");
      setErrorEmail(true);
      return;
    }
    //Email is valid
    console.log("Email OK");
    setErrorEmail(false);
  };

  const validatePassword = (password) => {
    let number = /[0-9]/;
    let special = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

    //Rules : must include number and special character, password length minimum 8 char
    if (
      !number.test(password) ||
      !special.test(password) ||
      password.length < 8
    ) {
      console.log("Password invalid");
      setErrorPassword(true);
      return;
    }

    //Password is valid
    console.log("Password OK");
    setErrorPassword(false);
  };

  const validateConfirm = (confirm) => {
    //Confirm password checking
    if (!(confirm === password)) {
      setErrorConfirm(true);
      console.log("Password doesn't match");
      return;
    }
    //Confirm is valid
    console.log("Confirm password OK");
    setErrorConfirm(false);
  };

  const validatePhone = (phone) => {
    //Phone validation
    let number = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g;
    if (!number.test(phone)) {
      console.log("Phone number not valid");
      setErrorPhone(true);
      return;
    }
    //Phone is valid
    console.log("Phone number OK");
    setErrorPhone(false);
  };

  //Register Function
  const onRegister = (event) => {
    //event.preventDefault() --> Disable default behavior event submit (disable refresh page)
    event.preventDefault();

    console.log(username, email, password, confirm, phone);
    const newUser = {
      username,
      email,
      password,
      phone,
    };

    //Check username data using GET
    Axios.get(URL + "/register", {
      params: {
        username,
        email,
      },
    })
      .then((respond) => {
        //Cancel if duplication of username or email
        if (respond.data.length) {
          setModal(true);
          setErrorRegistration(true);
          console.log("Username or email already exist");
          return;
        }
        console.log("OK");
        //POST data to back-end
        Axios.post(URL + "/register", newUser)
          .then((respond) => {
            console.log("respond", respond);
            setModal(true);

            //Clear Input Form
            clearInput();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Render webpage
  return (
    <div>
      <div className="register-container">
        <div className="container">
          <div className="register-form">
            <h2 className="mx-auto">Register</h2>
            <Form onSubmit={onRegister}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={onHandleUsername}
                  isInvalid={errorUsername}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onHandleEmail}
                  isInvalid={errorEmail}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={onHandlePhone}
                  isInvalid={errorPhone}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onHandlePassword}
                  isInvalid={errorPassword}
                />
                <Form.Text className="text-muted">
                  Use 8 or more characters and must contain numbers and symbols.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm"
                  value={confirm}
                  onChange={onHandleConfirm}
                  isInvalid={errorConfirm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Text className="text-dark fs-6">
                  Already have an account?{" "}
                  <Link to="/" onClick={() => dispatch({ type: SIGN_IN })}>
                    Sign In
                  </Link>
                </Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  errorUsername ||
                  errorEmail ||
                  errorPassword ||
                  errorConfirm ||
                  errorPhone
                }
              >
                Submit
              </Button>
            </Form>
            <Modal show={showModal} onHide={handleCloseModal}>
              {errorRegistration ? (
                <div>
                  <Modal.Header closeButton>
                    <Modal.Title>Register Failed</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Username or email already exist</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </div>
              ) : (
                <div>
                  <Modal.Header closeButton>
                    <Modal.Title>Register Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Please check your email to verify your account
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
