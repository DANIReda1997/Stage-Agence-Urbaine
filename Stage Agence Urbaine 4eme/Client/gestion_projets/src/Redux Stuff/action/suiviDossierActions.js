import { SEARCH_DOSSIER_A_SUIVRE } from "./types";
import axios from "axios";

export const findDossier = num_dossier => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/searchdossier/${num_dossier}`
  );
  dispatch({
    type: SEARCH_DOSSIER_A_SUIVRE,
    payload: response.data
  });
};
