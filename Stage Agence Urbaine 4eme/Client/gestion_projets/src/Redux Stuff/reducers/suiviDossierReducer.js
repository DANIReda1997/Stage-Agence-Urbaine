import { SEARCH_DOSSIER_A_SUIVRE } from "../action/types";

const initialState = {
  dossierAsuivre: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DOSSIER_A_SUIVRE:
      return {
        dossierAsuivre: action.payload
      };
    default:
      return state;
  }
}
