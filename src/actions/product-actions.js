import Axios from "axios";
import { GET_PRODUCTS } from "./types";
const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = (search) => {
  return async (dispatch) => {
    try {
      const query =
        search === "" ? "/products/get" : `/products/get?name=%${search}%`;
      const respond = await Axios.get(API_URL + query);
      console.log("respond", respond);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};
