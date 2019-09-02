import { PERSONNELOGIN } from "./types";
import axios from "axios";

export const personneLogin = (login, password) => async dispatch => {
  const response = await axios.get(
    `http://localhost:8080/personneLogin/${login}/${password}`
  );
  dispatch({
    type: PERSONNELOGIN,
    payload: response.data
  });
};
