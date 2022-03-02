import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/product-actions";
import { Button, Card, Image } from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Product_Detail(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return {
      products: state.products.data,
    };
  });
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  const renderListProducts = () => {
    console.log("Productnya", products);
    return products.map((product) => {
      return (
        <Card key={product.id} id="product-card">
          {/* <Card.Img variant="top" src={product.images[0]} /> */}
          <Card.Body className="card-body">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {"Rp. "}
              {product.price}
              {`/${product.unit}`}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => navigation(`/products/detail/${product.id}`)}
            >
              Check Details
            </Button>
          </Card.Body>
        </Card>
      );
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
        {/* <!---//webfonts--->
		<!----start-top-nav-script----> */}
        {/* <!----//End-top-nav-script----> */}
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
          {/* <!-- //products ----> */}
          {/* <!----product-details---> */}
          <div className="product-details">
            <div className="container">
              <div className="product-details-row1">
                <div className="product-details-row1-head">
                  <h2>Men'sFootwear</h2>
                  <p>Hookset Handcrafted Fabric Chukka</p>
                </div>
                <div className="product-filter-grids d-flex flex-row">
                  <Image
                    className="fluid rounded w-50 mx-2 my-2"
                    src="assets/img/about.jpg"
                  />
                  <div className="product-price w-50">
                    <div className="product-price-left text-right w-100">
                      <h3>Current Price</h3>
                      <h5>109.00$</h5>
                    </div>
                    <div className="clearfix"> </div>
                    <div className="product-price-details">
                      <p className="text-right">
                        This is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here,e{" "}
                      </p>
                      <div className=" d-flex justify-content-center">
                        <a className="shipping" href="#">
                          <span> </span>Free shipping
                        </a>
                      </div>
                      {/* Add To Cart */}
                      <div className="clearfix d-flex flex-row w-100 bg-dark">
                        <div className="product-size-qty d-flex w-100 justify-content-between">
                          <div className="pro-qty d-flex flex-row">
                            <div className="d-flex align-items-center text-info">
                              Quantity:
                            </div>
                            <select>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                          <div className="add-cart-btn d-flex">
                            <input type="button" value="Add to cart" />
                          </div>
                        </div>
                      </div>
                      <div className="product-cart-share">
                        <ul className="product-share text-right">
                          <h3 className="d-flex justify-content-center">
                            Share This:
                          </h3>
                          <div className="d-flex justify-content-between">
                            <ul>
                              <li>
                                <a className="share-face" href="#">
                                  <span> </span>{" "}
                                </a>
                              </li>
                              <li>
                                <a className="share-twitter" href="#">
                                  <span> </span>{" "}
                                </a>
                              </li>
                              <li>
                                <a className="share-google" href="#">
                                  <span> </span>{" "}
                                </a>
                              </li>
                              <li>
                                <a className="share-rss" href="#">
                                  <span> </span>{" "}
                                </a>
                              </li>
                              <div className="clear"> </div>
                            </ul>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix"> </div>
                {/* <!--//product-details---> */}
              </div>
              {/* <!---- product-details ----> */}
              <div className="product-tabs">
                {/* <!--Horizontal Tab--> */}
                <div id="horizontalTab">
                  <div id="tab-1" className="product-complete-info">
                    <h3>DESCRIPTION:</h3>
                    <p>
                      With its beautiful premium leather, lace-up oxford
                      styling, recycled rubber outsoles and 9-inch height, this
                      Earthkeepers City Premium style is an undeniably handsome
                      boot. To complement its rustic, commanding outer
                      appearance, we've paid attention to the inside as well -
                      by adding SmartWool® faux shearling to the linings and
                      crafting the footbed using our exclusive anti-fatigue
                      comfort foam technology to absorb shock. Imported.
                    </p>
                    <span>DETAILS:</span>
                    <div className="product-fea">
                      <p>
                        Premium burnished full-grain leather and suede upper
                      </p>
                      <p>
                        Leather is from a tannery rated Silver for its water,
                        energy and waste-management practices
                      </p>
                      <p>
                        Leather lining and footbed for a premium feel and
                        optimal comfort
                      </p>
                      <p>
                        SmartWool® faux shearling lining is made with 60% merino
                        wool and 40% PET
                      </p>
                      <p>
                        Reflective insole board for additional warmth under foot
                      </p>
                      <p>100% organic cotton laces</p>
                      <p>
                        SmartWool® fabric-lined anti-fatigue footbed provides
                        superior, all-day comfort and climate control
                      </p>
                      <p>
                        Timberland® exclusive Gripstick™ and Green Rubber™
                        outsole is made with 42% recycled rubber
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- Responsive Tabs JS --> */}
                <script
                  src="assets/js/jquery.responsiveTabs.js"
                  type="text/javascript"
                ></script>
              </div>
              {/* <!-- //product-details ----> */}
            </div>
          </div>
          {/* <!----content----> */}
          <div className="clearfix"> </div>
          {/* <!----footer---> */}
          <div className="clearfix"> </div>
          {/* <!---//footer---> */}
        </div>
        {/* <!----container----> */}
      </div>
    </div>
  );
}

export default Product_Detail;
