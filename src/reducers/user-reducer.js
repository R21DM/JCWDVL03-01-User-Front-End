import { LOGIN, LOGOUT, SIGN_IN, SIGN_OFF } from "../actions/types";

var INITIAL_STATE = {
  id: null,
  role: null,
  username: "",
  email: "",
  phone: null,
  signIn: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      if (!action.payload) {
        return INITIAL_STATE;
      }
      return (INITIAL_STATE = {
        ...state,
        id: action.payload.id,
        role: action.payload.role,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        signIn: false,
      });

    case LOGOUT:
      return (INITIAL_STATE = {
        id: null,
        role: null,
        username: "",
        email: "",
        phone: null,
      });

    case SIGN_IN:
      return {
        ...state,
        signIn: true,
      };

    case SIGN_OFF:
      return {
        ...state,
        signIn: false,
      };

    default:
      return INITIAL_STATE;
  }
};

export default userReducer;
