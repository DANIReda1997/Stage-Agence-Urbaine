import {
  PROJETSBYARCHITECTE,
  GET_CONTIBUTIONS_FOR_GRAND_PROJET
} from "../action/types";

const initialState = {
  projets: [],
  contibutions_for_grand_projet: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJETSBYARCHITECTE:
      return {
        ...state,
        projets: action.payload
      };
    case GET_CONTIBUTIONS_FOR_GRAND_PROJET:
      return {
        ...state,
        contibutions_for_grand_projet: action.payload
      };
    default:
      return state;
  }
}
