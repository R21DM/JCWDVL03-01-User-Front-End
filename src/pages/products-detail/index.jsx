import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/product-actions";
import { Button, Card } from "react-bootstrap";
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
        <div className="container">
          {/* <!----top-header----> */}
          <div className="top-header">
            <div className="logo">
              <a href="index.html">
                <img src="assets/img/logo.png" title="brandlogo" />
              </a>
            </div>

            <div className="clearfix"> </div>
          </div>
          {/* <!----//top-header----> */}
          <div className="top-header-nav">
            <br />
            <div className="clearfix"> </div>
          </div>
        </div>
        {/* <!--//top-header-nav----> */}
        {/* <!----content----> */}
        <div className="content">
          <div className="container">
            {/* <!--- products ----> */}
            <div className="products">
              <div className="product-filter">
                <h1>
                  <a href="#">FILTER</a>
                </h1>
                <div className="product-filter-grids">
                  {/* <!----> */}
                  <div className="col-md-6 product-filter-grid1-brands-col2"></div>
                  {/* <!----> */}
                  <div className="product-filter-grid1-brands-col3"></div>
                  <div className="clearfix"> </div>
                </div>
              </div>
            </div>
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
                <div className="col-md-4 product-details-row1-col1">
                  {/* <!----details-product-slider---> */}
                  {/* <!-- Include the Etalage files --> */}
                  <link rel="stylesheet" href="assets/css/etalage.css" />
                  <script src="assets/js/jquery.etalage.min.js"></script>
                  {/* <!-- Include the Etalage files --> */}
                  {/* <!----//details-product-slider---> */}
                  <div className="details-left">
                    <div className="details-left-slider">
                      <ul id="etalage">
                        <li>
                          <a href="optionallink.html">
                            <img
                              className="etalage_thumb_image"
                              src="assets/img/product-slide/image1_thumb.jpg"
                            />
                            <img
                              className="etalage_source_image"
                              src="assets/img/product-slide/image1_large.jpg"
                            />
                          </a>
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image2_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image2_large.jpg"
                          />
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image3_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image3_large.jpg"
                          />
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image4_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image4_large.jpg"
                          />
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image5_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image5_large.jpg"
                          />
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image6_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image6_large.jpg"
                          />
                        </li>
                        <li>
                          <img
                            className="etalage_thumb_image"
                            src="assets/img/product-slide/image7_thumb.jpg"
                          />
                          <img
                            className="etalage_source_image"
                            src="assets/img/product-slide/image7_large.jpg"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 product-details-row1-col2">
                  <div className="product-rating">
                    <a className="rate" href="#">
                      <span> </span>
                    </a>
                    <label>
                      <a href="#">
                        Read <b>8</b> Reviews
                      </a>
                    </label>
                  </div>
                  <div className="product-price">
                    <div className="product-price-left text-right">
                      <span>174.00</span>
                      <h5>109.00$</h5>
                    </div>
                    <div className="product-price-right">
                      <a href="#">
                        <span> </span>
                      </a>
                      <label>
                        {" "}
                        save <b>40%</b>
                      </label>
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                  <div className="product-price-details">
                    <p className="text-right">
                      This is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here,e{" "}
                    </p>
                    <a className="shipping" href="#">
                      <span> </span>Free shipping
                    </a>
                    <div className="clearfix"> </div>
                    <div className="product-size-qty">
                      <div className="pro-size">
                        <span>Size:</span>
                        <select>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                        </select>
                      </div>
                      <div className="pro-qty">
                        <span>Qty:</span>
                        <select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <div className="clearfix"> </div>
                    <div className="product-cart-share">
                      <div className="add-cart-btn">
                        <input type="button" value="Add to cart" />
                      </div>
                      <ul className="product-share text-right">
                        <h3>Share This:</h3>
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
                      </ul>
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
                  <ul>
                    <li>
                      <a href="#tab-1">Product overwiev</a>
                    </li>
                    <li>
                      <a href="#tab-2">Features</a>
                    </li>
                    <li>
                      <a href="#tab-3">Customer reviews</a>
                    </li>
                  </ul>
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
