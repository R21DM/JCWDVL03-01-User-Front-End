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
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1>Liquid Products</h1>
              <p>We provide product in ml per-stock</p>
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
              }}
            >
              <h1>Solid Product</h1>
              <p>We provide product in gr per-stock</p>
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
