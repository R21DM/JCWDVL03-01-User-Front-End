import { LOGIN, LOGOUT } from "../actions/types";

var INITIAL_STATE = {
  id: null,
  role: null,
  username: "",
  email: "",
  phone: null,
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
      });

    case LOGOUT:
      return (INITIAL_STATE = {
        id: null,
        role: null,
        username: "",
        email: "",
        phone: null,
      });
    default:
      return state;
  }
};

export default userReducer;
