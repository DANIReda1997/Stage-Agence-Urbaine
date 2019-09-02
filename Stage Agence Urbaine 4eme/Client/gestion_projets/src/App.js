import React, { Component } from "react";
import Header from "./Components/Little Stuff/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux Stuff/store";
import PageGarde from "./Components/PageGarde";
import InfoDossier from "./Components/InfoDossier";
import PageArchitecte from "./Components/PageArchitecte";
import testFile from "./Components/Little Stuff/testFile";
import AjoutProjetArchitecte from "./Components/AjoutProjetArchitecte";
import PageResponsable from "./Components/PageResponsable";
import PageAdmin from "./Components/PageAdmin";
import SuivrePetitProjetAdmin from "./Components/SuivrePetitProjetAdmin";
import SuivreGrandProjetAdmin from "./Components/SuivreGrandProjetAdmin";
import Statistique from "./Components/Statistique";
import about from "./Components/Little Stuff/about";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header branding="E-Instruction" />
            <Switch>
              <Route exact path="/" component={PageGarde} />
              <Route exact path="/InfoDossier" component={InfoDossier} />
              <Route exact path="/PageArchitecte" component={PageArchitecte} />
              <Route
                exact
                path="/AjoutProjetArchitecte"
                component={AjoutProjetArchitecte}
              />
              <Route exact path="/test" component={testFile} />
              <Route
                exact
                path="/PageResponsable"
                component={PageResponsable}
              />
              <Route exact path="/PageAdmin" component={PageAdmin} />
              <Route
                exact
                path="/SuivrePetitProjetAdmin"
                component={SuivrePetitProjetAdmin}
              />
              <Route
                exact
                path="/SuivreGrandProjetAdmin"
                component={SuivreGrandProjetAdmin}
              />
              <Route exact path="/About" component={about} />
              <Route exact path="/Statistique" component={Statistique} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
