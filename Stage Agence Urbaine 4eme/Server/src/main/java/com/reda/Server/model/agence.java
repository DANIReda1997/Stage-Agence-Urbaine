package com.reda.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class agence {
    @Id
    @GeneratedValue
    private Long id;
    private String nom;
    private String adresse;
    @JsonIgnore
    @OneToOne(mappedBy = "agence")
    private responsable responsable;

    @OneToMany(mappedBy = "agencee")
    @JsonIgnore
    private List<agencegrandprojet> agencegrandprojet = new ArrayList<agencegrandprojet>(0);

    public agence() {
    }

    public agence(String nom, String adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public com.reda.Server.model.responsable getResponsable() {
        return responsable;
    }

    public void setResponsable(com.reda.Server.model.responsable responsable) {
        this.responsable = responsable;
    }
}
