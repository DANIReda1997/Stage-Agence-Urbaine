import { combineReducers } from "redux";
import suiviDossierReducer from "./suiviDossierReducer";
import personneReducer from "./personneReducer";
import architecteReducer from "./architecteReducer";
import agenceReducer from "./agenceReducer";
import responsableReducer from "./responsableReducer";
import adminReducer from "./adminReducer";
export default combineReducers({
  suiviDossier: suiviDossierReducer,
  personne: personneReducer,
  architecte: architecteReducer,
  agence: agenceReducer,
  responsable: responsableReducer,
  admin: adminReducer
});
