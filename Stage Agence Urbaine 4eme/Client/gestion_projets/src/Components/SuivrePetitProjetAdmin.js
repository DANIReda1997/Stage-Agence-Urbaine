import React, { Component } from "react";
import { connect } from "react-redux";
import AffichageSingleRow from "./Little Stuff/AffichageSingleRow";
import axios from "axios";

class SuivrePetitProjetAdmin extends Component {
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
  handleRetourClick = e => {
    this.props.history.push("/PageAdmin");
  };
  handleActionClick = async (action, e) => {
    await axios.get(
      `http://localhost:8080/ModifierStatutPetitProjet/${this.props.DossierASuivreAdmin.id}/${action}`
    );
    this.props.history.push("/PageAdmin");
  };
  render() {
    const { DossierASuivreAdmin } = this.props;
    console.log(this.props.DossierASuivreAdmin);
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h3>Info Dossier :</h3>
          </div>
          <div className="offset-1 col-6">
            <h3>Pieces Administratives :</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-5">
            <AffichageSingleRow
              info={1}
              value={DossierASuivreAdmin.id}
              label="Num Dossier :"
            />
            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.grandoupetit}
              label="Type Projet :"
            />

            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.cinproprietaire}
              label="Cin Proprietaire :"
            />
            <br />
            <AffichageSingleRow
              value={
                DossierASuivreAdmin.archi.nom +
                " " +
                DossierASuivreAdmin.archi.prenom
              }
              label="Architecte :"
            />
            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.budjet + " Dh"}
              label="Budget :"
            />
            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.description}
              label="Description :"
            />
            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.commune}
              label="Commune :"
            />
            <br />
            <AffichageSingleRow
              value={DossierASuivreAdmin.statut}
              label="Statut :"
            />
            <br />
            <div className="row mt-3">
              <div className="col-5">
                <button
                  className="btn btn-secondary btn-block"
                  onClick={this.handleRetourClick}
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
          <div className="offset-1 col-6">
            <div className="row mt-5">
              <div className="shadow col-5">
                <strong>Plan Alignement :</strong>
              </div>
              <div className="col-3 offset-1 ">
                <div>
                  <button
                    className="btn btn-block btn-success"
                    onClick={this.onHandlePlanClick.bind(
                      this,
                      DossierASuivreAdmin.plan_alignement,
                      "Plan Alignement"
                    )}
                  >
                    Telecharger
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="shadow col-5">
                <strong>Plan Cadastrale :</strong>
              </div>
              <div className="col-3 offset-1 ">
                <div>
                  <button
                    className="btn btn-block btn-success"
                    onClick={this.onHandlePlanClick.bind(
                      this,
                      DossierASuivreAdmin.plan_cadastral,
                      "Plan Cadastral"
                    )}
                  >
                    Telecharger
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="shadow col-5">
                <strong>Contrat Architecte :</strong>
              </div>
              <div className="col-3 offset-1 ">
                <div>
                  <button
                    className="btn btn-block btn-success"
                    onClick={this.onHandlePlanClick.bind(
                      this,
                      DossierASuivreAdmin.contrat_architecte,
                      "Contrat Architecte"
                    )}
                  >
                    Telecharger
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-5">
                <h3>Action :</h3>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.handleActionClick.bind(this, "Approuver")}
                >
                  Approuver
                </button>
              </div>
              <div className="col-3 offset-1">
                <button
                  className="btn btn-danger btn-block"
                  onClick={this.handleActionClick.bind(this, "Annuler")}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  DossierASuivreAdmin: state.admin.DossierASuivreAdmin
});

export default connect(mapStateToProps)(SuivrePetitProjetAdmin);
