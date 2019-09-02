import { GET_EVERYTHING } from "../action/types";

const initialState = {
  everything: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVERYTHING:
      return {
        ...state,
        everything: action.payload
      };
    default:
      return state;
  }
}
