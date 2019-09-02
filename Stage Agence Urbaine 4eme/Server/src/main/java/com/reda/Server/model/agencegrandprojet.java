package com.reda.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class agencegrandprojet {
    @Id
    @GeneratedValue
    private Long id;


    @ManyToOne
    private agence agencee;

    @ManyToOne
    private grandprojet grandprojet;

    private double partbudget;
    private boolean payer;
    private Long recus;
    private String recus_statut;



    public agencegrandprojet() {

        this.payer = false;
        this.recus=null;
    }

    public agencegrandprojet(agence agencee, com.reda.Server.model.grandprojet grandprojet, double partbudget) {
        this.agencee = agencee;
        this.grandprojet = grandprojet;
        this.partbudget = partbudget;
        this.payer = false;
        this.recus=null;
        this.recus_statut=null;
    }

    public String getRecus_statut() {
        return recus_statut;
    }

    public void setRecus_statut(String recus_statut) {
        this.recus_statut = recus_statut;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public com.reda.Server.model.grandprojet getGrandprojet() {
        return grandprojet;
    }

    public void setGrandprojet(com.reda.Server.model.grandprojet grandprojet) {
        this.grandprojet = grandprojet;
    }

    public double getPartbudget() {
        return partbudget;
    }

    public void setPartbudget(double partbudget) {
        this.partbudget = partbudget;
    }

    public boolean isPayer() {
        return payer;
    }

    public void setPayer(boolean payer) {
        this.payer = payer;
    }

    public Long getRecus() {
        return recus;
    }

    public void setRecus(Long recus) {
        this.recus = recus;
    }

    public agence getAgencee() {
        return agencee;
    }

    public void setAgencee(agence agencee) {
        this.agencee = agencee;
    }
}
