import {
  GET_ALL_PROJETS_FOR_ADMIN,
  SEARCH_DOSSIER_A_SUIVRE_ADMIN,
  GET_CONTIBUTIONS_FOR_GRAND_PROJET_ADMIN
} from "./types";
import axios from "axios";

export const GetAllProjetForAdmin = () => async dispatch => {
  const response = await axios.get(
    "http://localhost:8080/GetAllProjetForAdmin"
  );
  dispatch({
    type: GET_ALL_PROJETS_FOR_ADMIN,
    payload: response.data
  });
};

export const findDossier = num_dossier => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/searchdossier/${num_dossier}`
  );
  dispatch({
    type: SEARCH_DOSSIER_A_SUIVRE_ADMIN,
    payload: response.data
  });
};

export const getContributionsForGrandProjet = id_grand_projet => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/getContributionsForGrandProjet/${id_grand_projet}`
  );
  dispatch({
    type: GET_CONTIBUTIONS_FOR_GRAND_PROJET_ADMIN,
    payload: response.data
  });
};
