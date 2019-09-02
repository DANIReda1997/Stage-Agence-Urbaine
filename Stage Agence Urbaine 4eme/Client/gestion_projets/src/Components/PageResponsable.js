import React, { Component } from "react";
import { connect } from "react-redux";
import { get_everything } from "../Redux Stuff/action/responsableActions";
import classnames from "classnames";
import axios from "axios";

class PageResponsable extends Component {
  state = {
    errors: {},
    recus: {},
    critere: "no"
  };
  handleFileSelected = (ev_id, e) => {
    this.setState({
      recus: {
        ...this.state.recus,
        [ev_id]: e.target.files[0]
      }
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (Object.keys(nextState.errors).length === 0) {
      return true;
    } else return true;
  }
  handleClick = async (ev_id, e) => {
    await this.setState({
      errors: {}
    });
    const { recus } = this.state;
    if (!recus[ev_id]) {
      this.setState({
        errors: {
          ...this.state.errors,
          [ev_id]: "Veuillez Choisir un Fichier"
        }
      });
    } else {
      let data = new FormData();
      data.append("file", this.state.recus[ev_id]);
      data.append("name", this.state.recus[ev_id].name);

      await axios.post(
        `http://localhost:8080/AjouterRecusAgenceGrandProjet/${ev_id}`,
        data
      );
      await this.props.get_everything(this.props.personneCo.agence.id);
      await this.setState({
        recus: {
          ...this.state.recus,
          [ev_id]: null
        }
      });
    }
  };
  componentDidMount() {
    this.props.get_everything(this.props.personneCo.agence.id);
  }
  handleCritereChange = e => {
    this.setState({
      critere: e.target.value
    });
  };
  render() {
    const { personneCo, everything } = this.props;
    const { errors, recus, critere } = this.state;
    var new_everything = [];
    if (critere === "no") new_everything = everything;
    else {
      new_everything = everything.filter(e => e.grandprojet.statut === critere);
    }
    console.log(new_everything);
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="row">
              <h4>
                Bonjour
                <span className="text-danger">
                  {" "}
                  {personneCo.nom} {personneCo.prenom}
                </span>{" "}
              </h4>
            </div>
            <div className="row">
              <h4>
                (Responsable de l'agence{" "}
                <strong>{personneCo.agence.nom}</strong>)
              </h4>
            </div>
          </div>
          <div className="col-2 offset-1">Rechercher Par :</div>
          <div className="col-4">
            <select
              className="custom-select"
              name="critere"
              onChange={this.handleCritereChange}
            >
              <option value="no">Pas de critere</option>
              <option>Waiting</option>
              <option>Approuver</option>
              <option>Annuler</option>
            </select>
          </div>
        </div>
        {new_everything.length > 0 ? (
          <div className="row mt-4">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <td style={{ width: 150 }}>
                      <strong>Num° Dossier</strong>
                    </td>
                    <td>
                      <strong>Architecte</strong>
                    </td>
                    <td>
                      <strong>Statut</strong>
                    </td>
                    <td>
                      <strong>Budget</strong>
                    </td>
                    <td style={{ width: 150 }}>
                      <strong>Votre Part</strong>
                    </td>
                    <td>
                      <strong>Recus</strong>
                    </td>
                    <td>
                      <strong>Action</strong>
                    </td>
                    <td>
                      <strong>Plus</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {new_everything.map(ev =>
                    ev.grandprojet.statut === "Waiting" ? (
                      <tr key={ev.id}>
                        <td>{ev.grandprojet.id}</td>
                        <td>
                          {ev.grandprojet.archi.nom +
                            " " +
                            ev.grandprojet.archi.prenom}
                        </td>
                        <td>{ev.grandprojet.statut}</td>
                        <td>{ev.grandprojet.budjet}</td>
                        <td>{ev.partbudget}</td>
                        <td>
                          {ev.payer === false ? (
                            <div>
                              <div className="custom-file">
                                <input
                                  name="recus"
                                  type="file"
                                  className={classnames("custom-file-input", {
                                    "is-invalid": errors[ev.id]
                                  })}
                                  onChange={this.handleFileSelected.bind(
                                    this,
                                    ev.id
                                  )}
                                />
                                <label className="custom-file-label">
                                  {recus[ev.id] ? (
                                    recus[ev.id].name
                                  ) : (
                                    <div>Choose a file !</div>
                                  )}
                                </label>
                              </div>
                              {errors[ev.id] && (
                                <div className="invalid-feedback d-block">
                                  {errors[ev.id]}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>Approuver</div>
                          )}
                        </td>
                        <td>
                          {ev.payer === false ? (
                            <button
                              className="btn btn-primary btn-block"
                              onClick={this.handleClick.bind(this, ev.id)}
                            >
                              {ev.recus ? (
                                <div>Modifier</div>
                              ) : (
                                <div>Payer</div>
                              )}
                            </button>
                          ) : (
                            <div>Approuver</div>
                          )}
                        </td>
                        <td>
                          {ev.recus ? (
                            ev.recus_statut
                          ) : (
                            <div>Entrez Le Recus</div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      <tr key={ev.id}>
                        <td>{ev.grandprojet.id}</td>
                        <td>
                          {ev.grandprojet.archi.nom +
                            " " +
                            ev.grandprojet.archi.prenom}
                        </td>
                        <td>{ev.grandprojet.statut}</td>
                        <td>{ev.grandprojet.budjet}</td>
                        <td>{ev.partbudget}</td>
                        <td>{ev.grandprojet.statut}</td>
                        <td>{ev.grandprojet.statut}</td>
                        <td>{ev.grandprojet.statut}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h4>
            <div className="invalid-feedback d-block">
              Vous n'avez aucun Projet !
            </div>
          </h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  everything: state.responsable.everything,
  personneCo: state.personne.personneCo
});

export default connect(
  mapStateToProps,
  { get_everything }
)(PageResponsable);
