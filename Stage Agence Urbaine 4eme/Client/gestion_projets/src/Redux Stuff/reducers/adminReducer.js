import {
  GET_ALL_PROJETS_FOR_ADMIN,
  SEARCH_DOSSIER_A_SUIVRE_ADMIN,
  GET_CONTIBUTIONS_FOR_GRAND_PROJET_ADMIN
} from "../action/types";

const InitialState = {
  LesProjets: [],
  DossierASuivreAdmin: {},
  Contributions: []
};

export default function(state = InitialState, action) {
  switch (action.type) {
    case SEARCH_DOSSIER_A_SUIVRE_ADMIN:
      return {
        ...state,
        DossierASuivreAdmin: action.payload
      };
    case GET_CONTIBUTIONS_FOR_GRAND_PROJET_ADMIN:
      return {
        ...state,
        Contributions: action.payload
      };
    case GET_ALL_PROJETS_FOR_ADMIN:
      return {
        ...state,
        LesProjets: action.payload
      };
    default:
      return state;
  }
}
