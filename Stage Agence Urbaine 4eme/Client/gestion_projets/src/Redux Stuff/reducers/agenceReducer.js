import { GET_ALL_AGENCES } from "../action/types";

const InitialState = {
  lesAgences: []
};

export default function(state = InitialState, action) {
  switch (action.type) {
    case GET_ALL_AGENCES:
      return {
        ...state,
        lesAgences: action.payload
      };
    default:
      return state;
  }
}
