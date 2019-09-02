package com.reda.Server.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("grandprojet")
public class grandprojet extends projet{
    @OneToMany(mappedBy = "grandprojet")
    @JsonIgnore
    private List<agencegrandprojet> agencegrandprojet = new ArrayList<agencegrandprojet>(0);

    public grandprojet() {
        super.setGrandoupetit("grand");
    }

    public grandprojet(String description, double budjet, String commune, Long plan_cadastral, Long plan_alignement, Long contrat_architecte, architecte archi) {
        super(description, budjet, commune, plan_cadastral, plan_alignement, contrat_architecte, archi);
        super.setGrandoupetit("grand");
    }



    public List<com.reda.Server.model.agencegrandprojet> getAgencegrandprojet() {
        return agencegrandprojet;
    }

    public void setAgencegrandprojet(List<com.reda.Server.model.agencegrandprojet> agencegrandprojet) {

        this.agencegrandprojet = agencegrandprojet;
    }
}
