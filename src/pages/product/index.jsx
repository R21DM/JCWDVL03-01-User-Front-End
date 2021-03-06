import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  categoryProducts,
  minPriceFilter,
  sortFilter,
} from "../../actions/product-actions";
import { Button, Card, Form, Pagination } from "react-bootstrap";
import "../product/style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Product(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return {
      products: state.products.data,
    };
  });
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [syringe, setSyringe] = useState(true);
  const [pill, setPill] = useState(true);

  //Pagination

  //Variable Name
  const [page, setPage] = useState(1);
  const [editableItem, setEditableItem] = useState({});
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 8;
  const endPageNumber = Math.ceil(products.length / itemPerPage);
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
    setLoading(true);
    Axios.get(API_URL + `/products/get`)
      .then((respond) => {
        // console.log(respond.data);
        setPage(1);
        dispatch(getProducts(""));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [products]);

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderListProducts = () => {
    console.log("Productnya", products);
    return products
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((product) => {
        return (
          <Card key={product.id} id="product-card">
            <Card.Img
              variant="top"
              src={`http://localhost:2000/products/${product.name}.jpg`}
              style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
              width="50%"
              height="50%"
            />
            <Card.Body className="card-body">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {"Rp. "}
                {product.price}
                {`/${product.unit}`}
              </Card.Text>
              {!product.volume == 0 ? (
                <Button
                  variant="primary"
                  onClick={() => navigation(`/product/${product.id}`)}
                >
                  Check Details
                </Button>
              ) : (
                <Button
                  disabled={true}
                  variant="primary"
                  onClick={() => navigation(`/product/${product.id}`)}
                >
                  Out of Stock
                </Button>
              )}
            </Card.Body>
          </Card>
        );
      });
  };

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        {/* --------------------------- Product  ------------------------------*/}

        <div className="product-container">
          <div className="filter">
            <div className="filter-header">
              <h5 className="left1">Filter</h5>
            </div>
            <div className="filter-header2">
              <div className="filter-header-color">
                <h6 className="left2">Category</h6>
              </div>

              <div className="left2 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexRadioDefault2"
                  checked={syringe}
                  onChange={() => {
                    setSyringe(!syringe);
                    console.log("syringe", !syringe);
                    console.log("pill", pill);
                    if (!syringe) {
                      if (pill && !syringe) {
                        setPage(1);
                        return dispatch(categoryProducts(""));
                      }
                      setPage(1);
                      dispatch(categoryProducts("Syringe"));
                    } else if (!pill && syringe) {
                      setPage(1);
                      dispatch(categoryProducts("none"));
                    } else dispatch(categoryProducts("pill"));
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Syringe
                </label>
              </div>

              <div className="left2 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexRadioDefault3"
                  checked={pill}
                  onChange={() => {
                    setPill(!pill);
                    console.log("syringe", syringe);
                    console.log("pill", !pill);
                    if (!pill) {
                      if (!pill && syringe) {
                        setPage(1);
                        return dispatch(categoryProducts(""));
                      }
                      setPage(1);
                      dispatch(categoryProducts("pill"));
                    } else if (pill && !syringe) {
                      setPage(1);
                      dispatch(categoryProducts("none"));
                    } else dispatch(categoryProducts("Syringe"));
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  Pill
                </label>
              </div>
            </div>
            <div className="filter-header2">
              <div className="filter-header-color">
                <h6 className="left2">Sort</h6>
              </div>

              <div className="left2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="sortFil"
                  name="sortPrice"
                  onChange={() => {
                    setPage(1);
                    dispatch(sortFilter(`asc`));
                  }}
                />
                <label className="form-check-label" htmlFor="sortFil">
                  Lowest Price
                </label>
              </div>

              <div className="left2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="sortFil2"
                  name="sortPrice"
                  onChange={() => {
                    setPage(1);
                    dispatch(sortFilter(`desc`));
                  }}
                />
                <label className="form-check-label" htmlFor="sortFil2">
                  Highest Price
                </label>
              </div>
            </div>
            <div className="filter-header3">
              <div className="filter-header2 filter-header-color">
                <h6 className="left3">Price</h6>
              </div>
              <Form.Group className="mb-3 form1">
                <div>
                  <input
                    type="text"
                    className="form-control form2"
                    placeholder="Min Price"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "");
                    }}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setPage(1);
                      return dispatch(minPriceFilter(e.target.value));
                    }}
                  />
                </div>
                <div className="price-tag">Rp</div>
              </Form.Group>
            </div>
            <Form.Group className="mb-3 form1" controlId="">
              <div>
                <input
                  type="text"
                  className="form-control form2"
                  placeholder="Max Price"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "");
                  }}

                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   return dispatch(minPrice(e.target.value));
                  // }}
                />
              </div>
              <div className="price-tag">Rp</div>
            </Form.Group>
          </div>
          <div className="body-feature-product">{renderListProducts()}</div>
        </div>
        {/* ---------Pagination---------- */}
        <div className="d-flex justify-content-center py-2">
          <Pagination>
            <Pagination.Prev
              disabled={page == 1 ? true : false}
              onClick={() => setPage(page - 1)}
            />
            {items}
            <Pagination.Next
              disabled={page == endPageNumber ? true : false}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
        </div>
      </main>
    </div>
  );
}

export default Product;
