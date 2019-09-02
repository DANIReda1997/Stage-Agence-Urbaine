import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProjetsByArchitecte,
  getContributionsForGrandProjet
} from "../Redux Stuff/action/architecteActions";
import { PetitProjetModal } from "./Little Stuff/PetitProjetModal";
import { GrandProjetModal } from "./Little Stuff/GrandProjetModal";
import { Link } from "react-router-dom";
import axios from "axios";

class PageArchitecte extends Component {
  state = {
    petitProjetModalAppear: false,
    grandProjetModalAppear: false,
    grandProjetClicked: {},
    petitProjetClicked: {}
  };

  componentWillMount() {
    this.props.getProjetsByArchitecte(this.props.personneCo.id);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextProps.projets) ===
        JSON.stringify(this.props.projets) &&
      nextState === this.state
    ) {
      return false;
    }
    return true;
  }
  onHandlePlanClick = (id_plan, type, e) => {
    fetch(`http://localhost:8080/download/${id_plan}`).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = type;
        a.click();
      });
    });
  };
  handleGrandProjetModalAppear = async (grandProjet, e) => {
    await this.props.getContributionsForGrandProjet(grandProjet.id);
    console.log(this.props.contibutions_for_grand_projet);
    this.setState({
      grandProjetModalAppear: true,
      grandProjetClicked: grandProjet
    });
  };
  handleGrandProjetModalHide = e => {
    this.setState({ grandProjetModalAppear: false });
  };
  handlePetitProjetModalAppear = (petitProjet, e) => {
    this.setState({
      petitProjetModalAppear: true,
      petitProjetClicked: petitProjet
    });
  };
  handlePetitProjetModalHide = e => {
    this.setState({ petitProjetModalAppear: false });
  };

  handleDeleteGrandProjet = async e => {
    console.log(this.state.grandProjetClicked);
    await axios.get(
      `http://localhost:8080/DeleteGrandProjet/${this.state.grandProjetClicked.id}`
    );

    await this.props.getProjetsByArchitecte(this.props.personneCo.id);
    await this.setState({ grandProjetModalAppear: false });
  };
  handleDeletePetitProjet = async e => {
    console.log(this.state.petitProjetClicked);
    await axios.get(
      `http://localhost:8080/DeletePetitProjet/${this.state.petitProjetClicked.id}`
    );
    await this.props.getProjetsByArchitecte(this.props.personneCo.id);
    await this.setState({ petitProjetModalAppear: false });
  };

  render() {
    const { projets, personneCo } = this.props;
    const {
      grandProjetModalAppear,
      petitProjetModalAppear,
      petitProjetClicked,
      grandProjetClicked
    } = this.state;
    const petitProjets = projets.filter(
      projet => projet.grandoupetit === "petit"
    );
    const grandProjets = projets.filter(
      projet => projet.grandoupetit === "grand"
    );
    return (
      <div className="container">
        <h4>
          Bonjour
          <span className="text-danger">
            {" "}
            {personneCo.nom} {personneCo.prenom}
          </span>{" "}
          (<strong>Architecte</strong>)
        </h4>
        <div className="row mt-4">
          <h1 className="display-4 mb-2 col-4 shadow ">
            <span className="text-danger">Petits</span> Projets
          </h1>
          <h4 className="display-4 mb-2 col-4 shadow offset-1">
            <span className="text-danger">Grands</span> Projets
          </h4>
        </div>

        <div className="row mt-5">
          <div className="col-4">
            {petitProjets.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Num° Dossier</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {petitProjets.map(petitProjet => (
                    <tr key={petitProjet.id}>
                      <td>
                        <strong>{petitProjet.id}</strong>
                      </td>
                      <td>{petitProjet.statut}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={this.handlePetitProjetModalAppear.bind(
                            this,
                            petitProjet
                          )}
                        >
                          Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4>
                <div className="invalid-feedback d-block">
                  Veuillez Ajouter un Petit Projet
                </div>
              </h4>
            )}
          </div>
          <div className="col-4 offset-1">
            {grandProjets.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Num° Dossier</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {grandProjets.map(grandProjet => (
                    <tr key={grandProjet.id}>
                      <td>
                        <strong>{grandProjet.id}</strong>
                      </td>
                      <td>{grandProjet.statut}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={this.handleGrandProjetModalAppear.bind(
                            this,
                            grandProjet
                          )}
                        >
                          Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4>
                <div className="invalid-feedback d-block">
                  Veuillez Ajouter un Grand Projet
                </div>
              </h4>
            )}
          </div>
          <div className="col-1 offset-2">
            <ul className="nav flex-column">
              <li className="nav-item mt-4">
                <Link to="/AjoutProjetArchitecte" className="shadow nav-link">
                  Ajouter Projet
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <PetitProjetModal
            petitProjetClicked={petitProjetClicked}
            handlePlanAlignementClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.plan_alignement,
              "Plan Alignement"
            )}
            handlePlanCadastralClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.plan_cadastral,
              "Plan Cadastral"
            )}
            handleContratArchitecteClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.contrat_architecte,
              "Contrat Architecte"
            )}
            petitProjetModalAppear={petitProjetModalAppear}
            handlePetitProjetModalHide={this.handlePetitProjetModalHide}
            handleDeletePetitProjet={this.handleDeletePetitProjet}
          />
        </div>
        <div>
          <GrandProjetModal
            contributions={this.props.contibutions_for_grand_projet}
            grandProjetClicked={grandProjetClicked}
            handlePlanAlignementClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.plan_alignement,
              "Plan Alignement"
            )}
            handlePlanCadastralClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.plan_cadastral,
              "Plan Cadastral"
            )}
            handleContratArchitecteClick={this.onHandlePlanClick.bind(
              this,
              petitProjetClicked.contrat_architecte,
              "Contrat Architecte"
            )}
            grandProjetModalAppear={grandProjetModalAppear}
            handleGrandProjetModalHide={this.handleGrandProjetModalHide}
            handleDeleteGrandProjet={this.handleDeleteGrandProjet}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projets: state.architecte.projets,
  personneCo: state.personne.personneCo,
  contibutions_for_grand_projet: state.architecte.contibutions_for_grand_projet
});

export default connect(
  mapStateToProps,
  { getProjetsByArchitecte, getContributionsForGrandProjet }
)(PageArchitecte);
