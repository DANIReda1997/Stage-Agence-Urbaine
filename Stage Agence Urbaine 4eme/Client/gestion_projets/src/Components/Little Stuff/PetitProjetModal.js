import React from "react";
import Modal from "react-bootstrap/Modal";

export const PetitProjetModal = ({
  petitProjetClicked,
  handlePlanAlignementClick,
  handlePlanCadastralClick,
  handleContratArchitecteClick,
  petitProjetModalAppear,
  handlePetitProjetModalHide,
  handleDeletePetitProjet
}) => {
  return (
    <Modal
      size="lg"
      show={petitProjetModalAppear}
      onHide={handlePetitProjetModalHide}
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
                <div className="offset-1">{petitProjetClicked.id}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Budget :</strong>
                </div>
                <div className="offset-1">
                  {petitProjetClicked.budjet} <strong>Dh</strong>
                </div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Description :</strong>
                </div>
                <div className="offset-1">{petitProjetClicked.description}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Commune :</strong>
                </div>
                <div className="offset-1">{petitProjetClicked.commune}</div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Cin Proprietaire :</strong>
                </div>
                <div className="offset-1">
                  {petitProjetClicked.cinproprietaire}
                </div>
              </div>
              <div className="row mt-3">
                <div className="shadow col-5">
                  <strong>Statut :</strong>
                </div>
                <div className="offset-1">{petitProjetClicked.statut}</div>
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
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        {petitProjetClicked.statut === "Waiting" ? (
          <div>
            <button
              className="btn btn-danger mr-2"
              onClick={handleDeletePetitProjet}
            >
              <i className="fas fa-trash-alt" /> Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-dark mr-2"
              style={{ cursor: "nopointer" }}
            >
              <i className="fas fa-trash-alt" /> Delete
            </button>
          </div>
        )}
        <button
          className="btn btn-success mr-5"
          onClick={handlePetitProjetModalHide}
        >
          <i className="fas fa-times" /> Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
