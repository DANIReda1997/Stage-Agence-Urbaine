import { PERSONNELOGIN } from "../action/types";

const InitialState = {
  personneCo: {}
};
export default function(state = InitialState, action) {
  switch (action.type) {
    case PERSONNELOGIN:
      return {
        ...state,
        personneCo: action.payload
      };
    default:
      return state;
  }
}
