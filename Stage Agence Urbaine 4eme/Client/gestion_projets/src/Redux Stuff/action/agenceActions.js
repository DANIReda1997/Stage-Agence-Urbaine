import { GET_ALL_AGENCES } from "./types";
import axios from "axios";

export const getAllAgence = () => async dispatch => {
  const response = await axios.get("http://localhost:8080/getAllAgences");
  dispatch({
    type: GET_ALL_AGENCES,
    payload: response.data
  });
};
