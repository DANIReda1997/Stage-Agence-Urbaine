package com.reda.Server.UsedModels;

import com.reda.Server.model.agence;
import com.reda.Server.model.architecte;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public class postedPetitProjet {
    private double budget;
    private String cin_proprietaire;
    private String description;
    private String commune;
    private MultipartFile plan_cadastral_file;
    private MultipartFile plan_alignement_file;
    private MultipartFile contrat_architecte_file;
    private Long architecte_id;

    public postedPetitProjet() {
    }

    public postedPetitProjet(double budget, String cin_proprietaire, String description, String commune, MultipartFile plan_cadastral_file, MultipartFile plan_alignement_file, MultipartFile contrat_architecte_file, Long architecte_id) {
        this.budget = budget;
        this.cin_proprietaire = cin_proprietaire;
        this.description = description;
        this.commune = commune;
        this.plan_cadastral_file = plan_cadastral_file;
        this.plan_alignement_file = plan_alignement_file;
        this.contrat_architecte_file = contrat_architecte_file;
        this.architecte_id = architecte_id;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public String getCin_proprietaire() {
        return cin_proprietaire;
    }

    public void setCin_proprietaire(String cin_proprietaire) {
        this.cin_proprietaire = cin_proprietaire;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public MultipartFile getPlan_cadastral_file() {
        return plan_cadastral_file;
    }

    public void setPlan_cadastral_file(MultipartFile plan_cadastral_file) {
        this.plan_cadastral_file = plan_cadastral_file;
    }

    public MultipartFile getPlan_alignement_file() {
        return plan_alignement_file;
    }

    public void setPlan_alignement_file(MultipartFile plan_alignement_file) {
        this.plan_alignement_file = plan_alignement_file;
    }

    public MultipartFile getContrat_architecte_file() {
        return contrat_architecte_file;
    }

    public void setContrat_architecte_file(MultipartFile contrat_architecte_file) {
        this.contrat_architecte_file = contrat_architecte_file;
    }

    public Long getArchitecte_id() {
        return architecte_id;
    }

    public void setArchitecte_id(Long architecte_id) {
        this.architecte_id = architecte_id;
    }
}
