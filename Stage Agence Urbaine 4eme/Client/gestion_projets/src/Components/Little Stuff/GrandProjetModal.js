import React from "react";
import Modal from "react-bootstrap/Modal";

export const GrandProjetModal = ({
  grandProjetClicked,
  handlePlanAlignementClick,
  handlePlanCadastralClick,
  handleContratArchitecteClick,
  grandProjetModalAppear,
  handleGrandProjetModalHide,
  contributions,
  handleDeleteGrandProjet
}) => {
  return (
    <Modal
      size="lg"
      show={grandProjetModalAppear}
      onHide={handleGrandProjetModalHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">Info Projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="row mt-2">
                <div className="shadow col-5">
                  <strong>Num° Dossier :</strong>
                </div>
                <div className="offset-1">{grandProjetClicked.id}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Budget :</strong>
                </div>
                <div className="offset-1">
                  {grandProjetClicked.budjet} <strong>Dh</strong>
                </div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Description :</strong>
                </div>
                <div className="offset-1">{grandProjetClicked.description}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Commune :</strong>
                </div>
                <div className="offset-1">{grandProjetClicked.commune}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Statut :</strong>
                </div>
                <div className="offset-1">{grandProjetClicked.statut}</div>
              </div>
            </div>
            <div className="col-5 offset-1">
              <div className="row mt-2">
                <div className="shadow col-5">
                  <strong>Plan Alignement :</strong>
                </div>
                <div className="offset-1 ">
                  <div>
                    <button
                      className="btn btn-block btn-success"
                      onClick={handlePlanAlignementClick}
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
                <div className="offset-1 ">
                  <div>
                    <button
                      className="btn btn-block btn-success"
                      onClick={handlePlanCadastralClick}
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
                <div className="offset-1 ">
                  <div>
                    <button
                      className="btn btn-block btn-success"
                      onClick={handleContratArchitecteClick}
                    >
                      Telecharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <strong>Contibution :</strong>
            </div>
          </div>

          <div className="row mt-3">
            {contributions.map(c => (
              <div className="col-4" key={c.id}>
                <div className="card sm">
                  <div className="card-header">
                    <strong>{c.agencee.nom}</strong>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">Part :</div>
                      <div className="col-6 offset-1">{c.partbudget} Dh</div>
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
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        {grandProjetClicked.statut === "Waiting" ? (
          <div>
            <button
              className="btn btn-danger mr-2"
              onClick={handleDeleteGrandProjet}
            >
              <i className="fas fa-trash-alt" /> Delete
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-dark mr-2">
              <i className="fas fa-trash-alt" /> Delete
            </button>
          </div>
        )}

        <button
          className="btn btn-success mr-5"
          onClick={handleGrandProjetModalHide}
        >
          <i className="fas fa-times" /> Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
