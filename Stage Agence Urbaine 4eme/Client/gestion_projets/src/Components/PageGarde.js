import React, { Component } from "react";
import TextInputGroup from "./Little Stuff/TextInputGroup";
import { findDossier } from "../Redux Stuff/action/suiviDossierActions";
import { personneLogin } from "../Redux Stuff/action/personneActions";
import { connect } from "react-redux";

class PageGarde extends Component {
  state = {
    errors: {},
    login: "",
    password: "",
    num_dossier: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginClick = async e => {
    if (!this.state.login) {
      this.setState({
        errors: {
          login_introuvable: "Veuillez saisir le login !"
        }
      });
      return;
    }
    if (!this.state.password) {
      this.setState({
        errors: {
          password_introuvable: "Veuillez saisir le Password !"
        }
      });
      return;
    }
    await this.props.personneLogin(this.state.login, this.state.password);
    console.log(this.props.personne);
    if (this.props.personne) {
      if (this.props.personne.personnetype === "architecte") {
        await this.setState({
          errors: {}
        });
        this.props.history.push("/PageArchitecte");
      }
      if (this.props.personne.personnetype === "responsable") {
        await this.setState({
          errors: {}
        });
        this.props.history.push("/PageResponsable");
      }
      if (this.props.personne.personnetype === "admin") {
        await this.setState({
          errors: {}
        });
        this.props.history.push("/PageAdmin");
      }
    } else {
      this.setState({
        errors: { personne_introuvable: "Login ou Password incorrecte !" }
      });
    }
  };

  handleSuiviDossierClick = async e => {
    if (this.state.num_dossier === "") {
      this.setState({
        errors: {
          num_dossier_insaisi: "Veuillez saisir le numero du dossier !"
        }
      });
      return;
    }
    await this.props.findDossier(this.state.num_dossier);
    if (!this.props.dossierAsuivre) {
      this.setState({
        errors: { num_dossier_introuvable: "Numero de dossier Introuvable !" }
      });
      return;
    }
    this.setState({
      errors: {}
    });
    this.props.history.push("/InfoDossier");
  };
  render() {
    const { login, password, errors, num_dossier } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="card mb-3">
              <div className="card-header">Login</div>
              <div className="card-body">
                <TextInputGroup
                  label="Login"
                  name="login"
                  placeholder="Enter Login"
                  value={login}
                  onChange={this.onChange}
                  error={errors.login_introuvable}
                />
                <TextInputGroup
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  type="password"
                  onChange={this.onChange}
                  error={errors.password_introuvable}
                />
                <button
                  className="btn btn-success"
                  onClick={this.handleLoginClick}
                >
                  Login
                </button>
              </div>
              {errors.personne_introuvable && (
                <div className="card-footer">
                  <div className="invalid-feedback d-block">
                    {errors.personne_introuvable}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card mb-3">
              <div className="card-header">Suivi de dossier</div>
              <div className="card-body">
                <TextInputGroup
                  label="Num° Dossier"
                  name="num_dossier"
                  placeholder="Enter Num"
                  type="number"
                  value={num_dossier}
                  onChange={this.onChange}
                  error={errors.num_dossier_insaisi}
                />
                <button
                  className="btn btn-success"
                  onClick={this.handleSuiviDossierClick}
                >
                  Search
                </button>
              </div>
              {errors.num_dossier_introuvable && (
                <div className="card-footer">
                  <div className="invalid-feedback d-block">
                    {errors.num_dossier_introuvable}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dossierAsuivre: state.suiviDossier.dossierAsuivre,
  personne: state.personne.personneCo
});

export default connect(
  mapStateToProps,
  { findDossier, personneLogin }
)(PageGarde);
