package com.reda.Server.model;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("petitprojet")
public class petitprojet extends projet {
    private String cinproprietaire;


    public petitprojet() {
        super.setGrandoupetit("petit");
    }


    public petitprojet(String description, double budjet, String commune, Long plan_cadastral, Long plan_alignement, Long contrat_architecte, architecte archi, String cinproprietaire) {
        super(description, budjet, commune, plan_cadastral, plan_alignement, contrat_architecte, archi);
        this.cinproprietaire = cinproprietaire;
        super.setGrandoupetit("petit");
    }

    public String getCinproprietaire() {
        return cinproprietaire;
    }

    public void setCinproprietaire(String cinproprietaire) {
        this.cinproprietaire = cinproprietaire;
    }
}
