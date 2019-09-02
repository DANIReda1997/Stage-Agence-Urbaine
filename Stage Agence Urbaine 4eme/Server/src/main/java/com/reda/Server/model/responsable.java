package com.reda.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue("responsable")
public class responsable extends personne {

    @OneToOne
    private agence agence;

    public responsable() {
    }

    public responsable(String nom, String prenom, String login, String password) {
        super(nom, prenom, login, password);
    }

    public agence getAgence() {
        return agence;
    }

    public void setAgence(agence agence) {
        this.agence = agence;
    }
}
