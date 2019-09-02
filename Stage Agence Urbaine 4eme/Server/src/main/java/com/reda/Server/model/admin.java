package com.reda.Server.model;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("admin")
public class admin extends personne {

    public admin() {
        super();
    }

    public admin(String nom, String prenom, String login, String password) {
        super(nom, prenom, login, password);
    }

}
