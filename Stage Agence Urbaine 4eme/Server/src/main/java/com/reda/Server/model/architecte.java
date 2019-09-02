package com.reda.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Set;

@Entity
@DiscriminatorValue("architecte")
public class architecte extends personne {

    @JsonIgnore
    @OneToMany(mappedBy = "archi")
    private Set<projet> lesprojets;

    public architecte() {
        super();
    }


    public architecte(String nom, String prenom, String login, String password) {
        super(nom, prenom, login, password);
    }

    public Set<projet> getLesprojets() {
        return lesprojets;
    }

    public void setLesprojets(Set<projet> lesprojets) {
        this.lesprojets = lesprojets;
    }
}
