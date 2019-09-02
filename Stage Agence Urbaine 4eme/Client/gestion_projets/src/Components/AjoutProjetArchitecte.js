import React, { Component } from "react";
import TextInputGroupAjoutProjet from "./Little Stuff/TextInputGroupAjoutProjet";
import { connect } from "react-redux";
import { getAllAgence } from "../Redux Stuff/action/agenceActions";
import { getProjetsByArchitecte } from "../Redux Stuff/action/architecteActions";
import classnames from "classnames";
import axios from "axios";
class AjoutProjetArchitecte extends Component {
  state = {
    budget: 0,
    description: "",
    cin_proprietaire: "",
    commune: "",
    type: "petitprojet",
    plan_cadastral: { name: "Choose a file !" },
    plan_alignement: { name: "Choose a file !" },
    contrat_architecte: { name: "Choose a file !" },
    agences: [],
    agences_selected: [],
    errors: {},
    part_budget_agences: {}
  };
  async componentDidMount() {
    await this.props.getAllAgence();
    this.setState({ agences: this.props.lesAgences });
  }
  handleFileSelected = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  handleSelectedAgence = e => {
    const A_Selected_Id = parseInt(e.target.value, 10);

    const A_Selected = this.state.agences.filter(
      agence => agence.id === A_Selected_Id
    );
    this.setState({
      agences_selected: [...this.state.agences_selected, A_Selected[0]]
    });
    this.setState({
      agences: this.state.agences.filter(agence => agence.id !== A_Selected_Id)
    });
    this.setState({
      part_budget_agences: {
        ...this.state.part_budget_agences,
        ["agence" + A_Selected_Id]: 0
      }
    });
    const agence_error = "agence" + A_Selected_Id;
    this.setState({
      errors: { ...this.state.errors, [agence_error]: "" }
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangePetitOuGrand = e => {
    this.setState({
      agences: this.props.lesAgences,
      agences_selected: [],
      [e.target.name]: e.target.value,
      part_budget_agences: {},
      errors: {},
      cin_proprietaire: ""
    });
  };

  handleChangePartBudget = (agence_id, e) => {
    this.setState({
      part_budget_agences: {
        ...this.state.part_budget_agences,
        ["agence" + agence_id]: e.target.value
      }
    });
  };

  handleDeleteAgence_Selected = (agence_id, e) => {
    const new_agences_selected = this.state.agences_selected.filter(
      a => a.id !== agence_id
    );
    const new_agence = this.state.agences_selected.filter(
      a => a.id === agence_id
    )[0];
    this.setState({
      agences_selected: new_agences_selected,
      agences: [...this.state.agences, new_agence]
    });
    delete this.state.part_budget_agences["agence" + agence_id];
    delete this.state.errors["agence" + agence_id];
  };

  handleAjouterClick = async e => {
    e.preventDefault();
    await this.setState({
      errors: {}
    });

    const {
      budget,
      description,
      commune,
      type,
      plan_cadastral,
      plan_alignement,
      contrat_architecte,
      agences_selected,
      part_budget_agences,
      cin_proprietaire
    } = this.state;
    var Error = false;

    if (budget === "0" || budget === 0) {
      await this.setState({
        errors: {
          ...this.state.errors,
          budget: "Veuillez Saisir le Budget !"
        }
      });
      Error = true;
    }
    if (description === "") {
      await this.setState({
        errors: {
          ...this.state.errors,
          description: "Veuillez Saisir la Description !"
        }
      });
      Error = true;
    }
    if (commune === "") {
      await this.setState({
        errors: {
          ...this.state.errors,
          commune: "Veuillez Saisir la Commune !"
        }
      });
      Error = true;
    }
    if (plan_cadastral.name === "Choose a file !") {
      this.setState({
        errors: {
          ...this.state.errors,
          plan_cadastral: "Veuillez Saisir le Plan Cadastral !"
        }
      });
      Error = true;
    }
    if (plan_alignement.name === "Choose a file !") {
      await this.setState({
        errors: {
          ...this.state.errors,
          plan_alignement: "Veuillez Saisir le Plan Alignement !"
        }
      });
      Error = true;
    }
    if (contrat_architecte.name === "Choose a file !") {
      await this.setState({
        errors: {
          ...this.state.errors,
          contrat_architecte: "Veuillez Saisir le Contrat !"
        }
      });
      Error = true;
    }
    if (type === "grandprojet") {
      if (!agences_selected[0]) {
        await this.setState({
          errors: {
            ...this.state.errors,
            noAgencesSelected: "Veuillez Choisir des Agences !"
          }
        });
        return;
      }

      agences_selected.map(agence_selected => {
        if (
          part_budget_agences["agence" + agence_selected.id] === 0 ||
          part_budget_agences["agence" + agence_selected.id] === "0"
        ) {
          this.setState({
            errors: {
              ...this.state.errors,
              ["agence" + agence_selected.id]: "Veuillez Entrer la Part !"
            }
          });
          Error = true;
        }
      });
      if (Error === true) return;

      var somme_part = 0;

      agences_selected.map(
        a => (somme_part += parseInt(part_budget_agences["agence" + a.id], 10))
      );
      if (parseInt(budget, 10) !== somme_part) {
        await this.setState({
          errors: {
            ...this.state.errors,
            budget_innegaux: "Budget Et Part Budget Innegaux !"
          }
        });
        return;
      }

      var new_part_budget_agences = Object.entries(part_budget_agences);
      const agences_selected_ids = this.state.agences_selected.map(a => a.id);

      let posted = new FormData();
      posted.append("plan_cadastral_file", this.state.plan_cadastral);
      posted.append("plan_alignement_file", this.state.plan_alignement);
      posted.append("contrat_architecte_file", this.state.contrat_architecte);
      posted.append("budget", this.state.budget);
      posted.append("description", this.state.description);
      posted.append("commune", this.state.commune);
      posted.append("agences_selected_ids", agences_selected_ids);
      posted.append("new_part_budget_agences", new_part_budget_agences);
      posted.append("architecte_id", this.props.personneCo.id);

      await axios.post(`http://localhost:8080/AjouterGrandProjet`, posted);

      await this.props.getProjetsByArchitecte(this.props.personneCo.id);
      this.props.history.push("/PageArchitecte");
    }
    if (type === "petitprojet") {
      if (cin_proprietaire === "") {
        await this.setState({
          errors: {
            ...this.state.errors,
            cin_proprietaire: "Veuillez Saisir le CIN !"
          }
        });
        return;
      }
      if (Error === true) return;
      let posted = new FormData();
      posted.append("plan_cadastral_file", this.state.plan_cadastral);
      posted.append("plan_alignement_file", this.state.plan_alignement);
      posted.append("contrat_architecte_file", this.state.contrat_architecte);
      posted.append("budget", this.state.budget);
      posted.append("description", this.state.description);
      posted.append("commune", this.state.commune);
      posted.append("cin_proprietaire", this.state.cin_proprietaire);
      posted.append("architecte_id", this.props.personneCo.id);

      await axios.post(`http://localhost:8080/AjouterPetitProjet`, posted);

      await this.props.getProjetsByArchitecte(this.props.personneCo.id);
      this.props.history.push("/PageArchitecte");
    }
  };

  handleRetourClick = e => {
    this.props.history.push("/PageArchitecte");
  };
  render() {
    const {
      budget,
      errors,
      description,
      commune,
      plan_cadastral,
      plan_alignement,
      contrat_architecte,
      type,
      agences,
      agences_selected,
      part_budget_agences,
      cin_proprietaire
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className=" col-7">
            <h1 className="display-4">
              <span className="text-danger">Ajout</span> Projet
            </h1>
          </div>
          {type === "grandprojet" && (
            <div className=" col-5">
              <h1 className="display-4">
                <span className="text-danger">Contributions</span>
              </h1>
            </div>
          )}
        </div>
        <div className="row mt-5">
          <div className="col-7">
            <div className="row mt-2">
              <div className="col-3">
                <strong>Type :</strong>
              </div>
              <div className="col-7">
                <select
                  className="custom-select"
                  name="type"
                  onChange={this.handleChangePetitOuGrand}
                >
                  <option value="petitprojet">Petit Projet</option>
                  <option value="grandprojet">Grand Projet</option>
                </select>
              </div>
            </div>
            {type === "petitprojet" && (
              <TextInputGroupAjoutProjet
                label="Cin Proprietaire :"
                value={cin_proprietaire}
                type="text"
                name="cin_proprietaire"
                onChange={this.handleChange}
                error={errors.cin_proprietaire}
              />
            )}

            <TextInputGroupAjoutProjet
              label="Budget :"
              value={budget}
              type="number"
              name="budget"
              onChange={this.handleChange}
              error={errors.budget}
            />
            <TextInputGroupAjoutProjet
              label="Description :"
              value={description}
              type="text"
              name="description"
              onChange={this.handleChange}
              error={errors.description}
            />
            <TextInputGroupAjoutProjet
              label="Commune :"
              value={commune}
              type="text"
              name="commune"
              onChange={this.handleChange}
              error={errors.commune}
            />

            <div className="row mt-2">
              <div className="col-3">
                <strong>Plan Cadastral :</strong>
              </div>
              <div className="col-7">
                <div className="custom-file">
                  <input
                    name="plan_cadastral"
                    type="file"
                    className={classnames("custom-file-input", {
                      "is-invalid": errors.plan_cadastral
                    })}
                    onChange={this.handleFileSelected}
                  />

                  <label className="custom-file-label">
                    {plan_cadastral.name}
                  </label>
                </div>
                {errors.plan_cadastral && (
                  <div className="invalid-feedback d-block">
                    {errors.plan_cadastral}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <strong>Plan Alignement :</strong>
              </div>
              <div className="col-7 ">
                <div className="custom-file">
                  <input
                    name="plan_alignement"
                    type="file"
                    className={classnames("custom-file-input", {
                      "is-invalid": errors.plan_alignement
                    })}
                    onChange={this.handleFileSelected}
                  />
                  <label className="custom-file-label">
                    {plan_alignement.name}
                  </label>
                </div>
                {errors.plan_alignement && (
                  <div className="invalid-feedback d-block">
                    {errors.plan_alignement}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <strong>Contrat Architecte :</strong>
              </div>
              <div className="col-7">
                <div className="custom-file">
                  <input
                    name="contrat_architecte"
                    type="file"
                    className={classnames("custom-file-input", {
                      "is-invalid": errors.contrat_architecte
                    })}
                    onChange={this.handleFileSelected}
                  />
                  <label className="custom-file-label">
                    {contrat_architecte.name}
                  </label>
                </div>
                {errors.contrat_architecte && (
                  <div className="invalid-feedback d-block">
                    {errors.contrat_architecte}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <button
                  className="btn btn-secondary btn-block"
                  onClick={this.handleRetourClick}
                >
                  Retour
                </button>
              </div>
              <div className="col-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.handleAjouterClick}
                >
                  Ajouter
                </button>
                {errors.budget_innegaux && (
                  <div className="invalid-feedback d-block">
                    {errors.budget_innegaux}
                  </div>
                )}
              </div>
            </div>
          </div>
          {type === "grandprojet" && (
            <div className="col-5">
              <div className="row">
                <div className="col-3">
                  <strong>Agences :</strong>
                </div>
                <div className="col-6 offset-1">
                  <select
                    className="custom-select"
                    onChange={this.handleSelectedAgence}
                    name="agenceselect"
                  >
                    <option>Choose !</option>
                    {agences.map(agence => (
                      <option value={agence.id} key={agence.id}>
                        {agence.nom}
                      </option>
                    ))}
                  </select>
                  {errors.noAgencesSelected && (
                    <div className="invalid-feedback d-block">
                      {errors.noAgencesSelected}{" "}
                    </div>
                  )}
                </div>
              </div>

              {agences_selected.map(agence => {
                const id = agence.id;
                const agence_error = errors["agence" + id];
                return (
                  <div key={agence.id}>
                    <div className="row mt-3">
                      <div className="col-4">
                        <i
                          className="fas fa-times"
                          style={{ cursor: "pointer" }}
                          onClick={this.handleDeleteAgence_Selected.bind(
                            this,
                            agence.id
                          )}
                        />
                        <strong> {agence.nom}</strong>
                      </div>
                      <div className="col-5 offset-1">
                        <input
                          type="number"
                          className={classnames(
                            "form-control form-control-md",
                            {
                              "is-invalid": agence_error
                            }
                          )}
                          placeholder="Part du Budget"
                          value={part_budget_agences["agence" + id]}
                          onChange={this.handleChangePartBudget.bind(
                            this,
                            agence.id
                          )}
                        />
                        {agence_error && (
                          <div className="invalid-feedback d-block">
                            {agence_error}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  lesAgences: state.agence.lesAgences,
  personneCo: state.personne.personneCo
});
export default connect(
  mapStateToProps,
  { getAllAgence, getProjetsByArchitecte }
)(AjoutProjetArchitecte);
