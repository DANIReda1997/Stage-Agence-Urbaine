import React, { Component } from "react";
import { connect } from "react-redux";
import AffichageSingleRow from "./Little Stuff/AffichageSingleRow";
import { getContributionsForGrandProjet } from "../Redux Stuff/action/adminActions";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

class SuivreGrandProjetAdmin extends Component {
  state = {
    modalAppear: false,
    canHeApprouver: false
  };

  componentWillMount() {
    axios
      .get(
        `http://localhost:8080/HasEveryAgencePayed/${this.props.DossierASuivreAdmin.id}`
      )
      .then(response => this.setState({ canHeApprouver: response.data }));
  }

  handleApprouverOrAnnulerPar = async (id_agence_grand_projet, action, e) => {
    await axios.get(
      `http://localhost:8080/ModifierStatutRecusPartBudget/${id_agence_grand_projet}/${action}`
    );
    this.setState({
      modalAppear: false
    });
    axios
      .get(
        `http://localhost:8080/HasEveryAgencePayed/${this.props.DossierASuivreAdmin.id}`
      )
      .then(response => this.setState({ canHeApprouver: response.data }));
  };

  handleClickDowloadRecus = (id_recus, e) => {
    fetch(`http://localhost:8080/download/${id_recus}`).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "recus";
        a.click();
      });
    });
  };

  handleModalHide = e => {
    this.setState({
      modalAppear: false
    });
  };

  handleModalAppear = async e => {
    await this.props.getContributionsForGrandProjet(
      this.props.DossierASuivreAdmin.id
    );
    this.setState({
      modalAppear: true
    });
    console.log(this.props.Contributions);
  };

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
      `http://localhost:8080/ModifierStatutGrandProjet/${this.props.DossierASuivreAdmin.id}/${action}`
    );
    this.props.history.push("/PageAdmin");
  };
  render() {
    const { modalAppear, canHeApprouver } = this.state;
    const { DossierASuivreAdmin } = this.props;
    console.log(canHeApprouver);
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
              <div className="row mt-4">
                <div className="col-5">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={this.handleModalAppear}
                  >
                    Contributions
                  </button>
                </div>
              </div>

              <br />
              <div className="row mt-4">
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
                {canHeApprouver === true ? (
                  <div className="col-3">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={this.handleActionClick.bind(this, "Approuver")}
                    >
                      Approuver
                    </button>
                  </div>
                ) : (
                  <div className="col-3">
                    <button className="btn btn-dark btn-block">
                      Approuver
                    </button>
                  </div>
                )}

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
        <Modal size="lg" show={modalAppear} onHide={this.handleModalHide}>
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">Contributions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                {this.props.Contributions.map(c => (
                  <div className="col-6" key={c.id}>
                    <div className="card mb-3">
                      <div className="card-header">{c.agencee.nom}</div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <strong>Part :</strong>
                          </div>
                          <div className="col-6 offset-1">{c.partbudget}</div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-4">
                            <strong>Payer :</strong>
                          </div>
                          {c.payer === false ? (
                            <div className="col-6 offset-1">Pas encore</div>
                          ) : (
                            <div className="col-6 offset-1">Deja Payer</div>
                          )}
                        </div>
                        {c.payer === false && (
                          <div>
                            <div className="row mt-2">
                              <div className="col-4">
                                <strong>Recus :</strong>
                              </div>
                              {c.recus === null ? (
                                <div className="col-6 offset-1">Pas encore</div>
                              ) : (
                                <div className="col-6 offset-1">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={this.handleClickDowloadRecus.bind(
                                      this,
                                      c.recus
                                    )}
                                  >
                                    Recus
                                  </button>
                                </div>
                              )}
                            </div>
                            {c.recus !== null && (
                              <div>
                                <div className="row mt-2">
                                  <div className="col-4">
                                    <strong>Action :</strong>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-4">
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={this.handleApprouverOrAnnulerPar.bind(
                                        this,
                                        c.id,
                                        "Approuver"
                                      )}
                                    >
                                      Approuver
                                    </button>
                                  </div>
                                  <div className="col-4 offset-1">
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={this.handleApprouverOrAnnulerPar.bind(
                                        this,
                                        c.id,
                                        "Annuler"
                                      )}
                                    >
                                      Annuler
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  DossierASuivreAdmin: state.admin.DossierASuivreAdmin,
  Contributions: state.admin.Contributions
});

export default connect(
  mapStateToProps,
  { getContributionsForGrandProjet }
)(SuivreGrandProjetAdmin);
