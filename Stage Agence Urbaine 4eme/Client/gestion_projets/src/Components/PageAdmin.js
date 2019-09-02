import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GetAllProjetForAdmin,
  findDossier
} from "../Redux Stuff/action/adminActions";

class PageAdmin extends Component {
  componentWillMount() {
    this.props.GetAllProjetForAdmin();
  }

  handleClick = async (typeProjet, idProjet, e) => {
    await this.props.findDossier(idProjet);

    if (typeProjet === "petit") {
      this.props.history.push("/SuivrePetitProjetAdmin");
    } else {
      this.props.history.push("/SuivreGrandProjetAdmin");
    }
  };

  render() {
    const { LesProjets, personneCo } = this.props;
    console.log(LesProjets);
    const petitProjets = LesProjets.filter(
      projet => projet.grandoupetit === "petit"
    );
    const grandProjets = LesProjets.filter(
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
          (<strong>Admin</strong>)
        </h4>
        <div className="row mt-4">
          <h1 className="display-4 mb-2 col-4 shadow ">
            <span className="text-danger">Petits</span> Projets
          </h1>
          <h4 className="display-4 mb-2 col-4 shadow offset-2">
            <span className="text-danger">Grands</span> Projets
          </h4>
        </div>

        <div className="row mt-5">
          <div className="col-5">
            {petitProjets.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <strong>Num° Dossier</strong>
                    </th>
                    <th>
                      <strong>Architecte</strong>
                    </th>
                    <th>
                      <strong>Statut</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {petitProjets.map(projet => (
                    <tr key={projet.id}>
                      <td>{projet.id}</td>
                      <td>
                        {projet.archi.nom} {projet.archi.prenom}
                      </td>
                      <td>{projet.statut}</td>
                      {projet.statut === "Waiting" && (
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={this.handleClick.bind(
                              this,
                              projet.grandoupetit,
                              projet.id
                            )}
                          >
                            More
                          </button>
                        </td>
                      )}
                      {projet.statut === "Annuler" && <td>Annuler</td>}
                      {projet.statut === "Approuver" && <td>Appouver</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4>
                <div className="invalid-feedback d-block">
                  Il n'y a pas de Petits Projets
                </div>
              </h4>
            )}
          </div>
          <div className="col-5 offset-1">
            {grandProjets.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <strong>Num° Dossier</strong>
                    </th>
                    <th>
                      <strong>Architecte</strong>
                    </th>
                    <th>
                      <strong>Statut</strong>
                    </th>
                    <th>
                      <strong>Action</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grandProjets.map(projet => (
                    <tr key={projet.id}>
                      <td>{projet.id}</td>
                      <td>
                        {projet.archi.nom} {projet.archi.prenom}
                      </td>
                      <td>{projet.statut}</td>
                      {projet.statut === "Waiting" && (
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={this.handleClick.bind(
                              this,
                              projet.grandoupetit,
                              projet.id
                            )}
                          >
                            More
                          </button>
                        </td>
                      )}
                      {projet.statut === "Annuler" && <td>Annuler</td>}
                      {projet.statut === "Approuver" && <td>Appouver</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4>
                <div className="invalid-feedback d-block">
                  Il n'y a pas de Grands Projets
                </div>
              </h4>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  LesProjets: state.admin.LesProjets,
  personneCo: state.personne.personneCo
});

export default connect(
  mapStateToProps,
  { GetAllProjetForAdmin, findDossier }
)(PageAdmin);
