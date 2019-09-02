import {
  PROJETSBYARCHITECTE,
  GET_CONTIBUTIONS_FOR_GRAND_PROJET
} from "./types";
import axios from "axios";

export const getProjetsByArchitecte = id_architecte => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/findProjetsByArchitecte/${id_architecte}`
  );
  dispatch({
    type: PROJETSBYARCHITECTE,
    payload: response.data
  });
};

export const getContributionsForGrandProjet = id_grand_projet => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/getContributionsForGrandProjet/${id_grand_projet}`
  );
  dispatch({
    type: GET_CONTIBUTIONS_FOR_GRAND_PROJET,
    payload: response.data
  });
};
