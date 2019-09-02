import { GET_EVERYTHING } from "./types";
import axios from "axios";

export const get_everything = id_agence => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/GetGrandProjetsByAgence/${id_agence}`
  );
  dispatch({
    type: GET_EVERYTHING,
    payload: response.data
  });
};
