package com.reda.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name ="projettype")
public abstract class projet {
    @Id
    @GeneratedValue
    private Long id;
    private String grandoupetit;
    private String description;
    private String statut;
    private double budjet;
    private String commune;
    private Long plan_cadastral;
    private Long plan_alignement;
    private Long contrat_architecte;
    @ManyToOne
    private architecte archi;

    public projet() {
    }

    public projet(String description, double budjet, String commune, Long plan_cadastral, Long plan_alignement, Long contrat_architecte, architecte archi) {

        this.description = description;
        this.statut = "Waiting";
        this.budjet = budjet;
        this.commune = commune;
        this.plan_cadastral = plan_cadastral;
        this.plan_alignement = plan_alignement;
        this.contrat_architecte = contrat_architecte;
        this.archi = archi;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public double getBudjet() {
        return budjet;
    }

    public void setBudjet(double budjet) {
        this.budjet = budjet;
    }

    public architecte getArchi() {
        return archi;
    }

    public void setArchi(architecte archi) {
        this.archi = archi;
    }

    public String getGrandoupetit() {
        return grandoupetit;
    }

    public void setGrandoupetit(String grandoupetit) {
        this.grandoupetit = grandoupetit;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public Long getPlan_cadastral() {
        return plan_cadastral;
    }

    public void setPlan_cadastral(Long plan_cadastral) {
        this.plan_cadastral = plan_cadastral;
    }

    public Long getPlan_alignement() {
        return plan_alignement;
    }

    public void setPlan_alignement(Long plan_alignement) {
        this.plan_alignement = plan_alignement;
    }

    public Long getContrat_architecte() {
        return contrat_architecte;
    }

    public void setContrat_architecte(Long contrat_architecte) {
        this.contrat_architecte = contrat_architecte;
    }
}
