import React, { Component } from "react";
import { connect } from "react-redux";
import { getContributionsForGrandProjet } from "../Redux Stuff/action/architecteActions";
import AffichageSingleRow from "./Little Stuff/AffichageSingleRow";

class InfoDossier extends Component {
  state = {
    typeProjet: ""
  };
  componentWillMount() {
    if (this.props.dossierAsuivre.grandoupetit === "grand") {
      this.setState({ typeProjet: "grand" });
      this.props.getContributionsForGrandProjet(this.props.dossierAsuivre.id);
    } else if (this.props.dossierAsuivre.grandoupetit === "petit") {
      this.setState({ typeProjet: "petit" });
    }
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
  render() {
    const { typeProjet } = this.state;
    const { dossierAsuivre } = this.props;
    console.log(dossierAsuivre);
    return (
      <div>
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
                value={dossierAsuivre.id}
                label="Num Dossier :"
              />
              <br />
              <AffichageSingleRow value={typeProjet} label="Type Projet :" />

              {typeProjet === "petit" && (
                <div>
                  <br />
                  <AffichageSingleRow
                    value={dossierAsuivre.cinproprietaire}
                    label="Cin Proprietaire :"
                  />
                </div>
              )}
              <br />
              <AffichageSingleRow
                value={
                  dossierAsuivre.archi.nom + " " + dossierAsuivre.archi.prenom
                }
                label="Architecte :"
              />
              <br />
              <AffichageSingleRow
                value={dossierAsuivre.budjet + " Dh"}
                label="Budget :"
              />
              <br />
              <AffichageSingleRow
                value={dossierAsuivre.description}
                label="Description :"
              />
              <br />
              <AffichageSingleRow
                value={dossierAsuivre.commune}
                label="Commune :"
              />
              <br />
              <AffichageSingleRow
                value={dossierAsuivre.statut}
                label="Statut :"
              />
              <br />
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
                        dossierAsuivre.plan_alignement,
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
                        dossierAsuivre.plan_cadastral,
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
                        dossierAsuivre.contrat_architecte,
                        "Contrat Architecte"
                      )}
                    >
                      Telecharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {typeProjet === "grand" && (
            <div>
              <div className="row mt-3">
                <div className="col-3">
                  <strong>Contibutions :</strong>
                </div>
              </div>
              <div className="row mt-3">
                {this.props.contibutions_for_grand_projet.map(c => (
                  <div className="col-3" key={c.id}>
                    <div className="card sm">
                      <div className="card-header">
                        <strong>{c.agencee.nom}</strong>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5">Part :</div>
                          <div className="col-6 offset-1">
                            {c.partbudget} Dh
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">Payer :</div>
                          {c.payer === false ? (
                            <div className="col-6 offset-1">Pas Encore</div>
                          ) : (
                            <div className="col-6 offset-1">Oui</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dossierAsuivre: state.suiviDossier.dossierAsuivre,
  contibutions_for_grand_projet: state.architecte.contibutions_for_grand_projet
});
export default connect(
  mapStateToProps,
  { getContributionsForGrandProjet }
)(InfoDossier);
