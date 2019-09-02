package com.reda.Server.model;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name ="personnetype")
public abstract class personne {
    @Id
    @GeneratedValue
    private Long id;
    private String nom;
    private String prenom;
    private String login;
    private String password;
    @Column(name="personnetype", nullable=false, updatable=false, insertable=false)
    private String personnetype;

    public personne() {
    }

    public personne(String nom, String prenom, String login, String password) {
        this.nom = nom;
        this.prenom = prenom;
        this.login = login;
        this.password = password;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPersonnetype() {
        return personnetype;
    }

    public void setPersonnetype(String personnetype) {
        this.personnetype = personnetype;
    }
}
