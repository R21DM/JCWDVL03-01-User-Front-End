import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style.css";

function Home(props) {
  useEffect(() => {}, []);
  const navigation = useNavigate();

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        {/* --------------------------- Home  ------------------------------*/}
        <div className="body-feature">
          <div className="banner">
            <div
              className="left"
              style={{
                background: `url(/images/1.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1>Syringe</h1>
              <p style={{ textAlign: "Center" }}>
                We provide product in ml per-stock{" "}
                <span style={{ fontSize: "12px" }}>
                  <br />
                  FREE Syringe for 1/100ml
                </span>
              </p>

              <Button
                className="shop"
                variant="outline-info"
                onClick={() => navigation("product")}
              >
                Shop Now
              </Button>
            </div>
            <div
              className="right"
              style={{
                background: `url(/images/2.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1>Pill</h1>
              <p style={{ textAlign: "Center" }}>
                We provide product in mg per-stock
              </p>
              <Button
                className="shop"
                variant="outline-info"
                onClick={() => navigation("product")}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
