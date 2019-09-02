package com.reda.Server.ressource;

import com.reda.Server.UsedModels.*;
import com.reda.Server.model.*;
import com.reda.Server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
public class projetRessource {
    @Autowired
    com.reda.Server.repository.projetRepository projetRepository;
    @Autowired
    com.reda.Server.repository.personneRepository personneRepository;
    @Autowired
    com.reda.Server.repository.grandprojetRepository grandprojetRepository;
    @Autowired
    agenceRepository agenceRepository;
    @Autowired
    DBFileRepository DBFileRepository;
    @Autowired
    agencegrandprojetRepository agencegrandprojetRepository;
    @Autowired
    petitprojetRepository petitprojetRepository;



    @GetMapping("/searchdossier/{id_dossier}")
    projet searchprojet(@PathVariable Long id_dossier){
        return projetRepository.findOne(id_dossier);
    }

    @GetMapping("/findProjetsByArchitecte/{id}")
    Set<projet> findProjetsByArchitecte(@PathVariable Long id){
        architecte a = (architecte) personneRepository.findOne(id);
        return projetRepository.findAllByArchi(a);
    }

    @GetMapping("/getContributionsForGrandProjet/{id_grand_projet}")
    List<agencegrandprojet> getContributionsForGrandProjet(@PathVariable Long id_grand_projet){

        return grandprojetRepository.findOne(id_grand_projet).getAgencegrandprojet();
    }



    @CrossOrigin("http://localhost:3000")
    @PostMapping("/AjouterGrandProjet")
    void addBig(@ModelAttribute posted posted) throws IOException {


        DBFile plan_castral = new DBFile(posted.getPlan_cadastral_file().getOriginalFilename(),
                posted.getPlan_cadastral_file().getContentType(),
                posted.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(plan_castral);
        DBFile plan_alignement = new DBFile(posted.getPlan_cadastral_file().getOriginalFilename(),
                posted.getPlan_cadastral_file().getContentType(),
                posted.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(plan_alignement);
        DBFile contrat_architecte = new DBFile(posted.getPlan_cadastral_file().getOriginalFilename(),
                posted.getPlan_cadastral_file().getContentType(),
                posted.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(contrat_architecte);


        architecte a = (architecte) personneRepository.findOne(posted.getArchitecte_id());

        grandprojet gP = new grandprojet(posted.getDescription(),posted.getBudget(),
                posted.getCommune(),plan_castral.getId(),plan_alignement.getId(),contrat_architecte.getId(),
                a);
        List<agencegrandprojet> allOfThem = new ArrayList<agencegrandprojet>(0);
        Long subId;
        double budgetForThatId = 0;

        for(int i=0;i<posted.getAgences_selected_ids().length;i++){
            for(int j=0;j<posted.getNew_part_budget_agences().length;j+=2){
                subId=Long.parseLong(posted.getNew_part_budget_agences()[j].substring(6));
                if(subId == posted.getAgences_selected_ids()[i]){
                    budgetForThatId = Double.parseDouble(posted.getNew_part_budget_agences()[j+1]);
                }
            }
            allOfThem.add(new agencegrandprojet(agenceRepository.findOne(posted.getAgences_selected_ids()[i]),
                    gP,budgetForThatId));
        }
        gP.setAgencegrandprojet(allOfThem);

        grandprojetRepository.save(gP);
        agencegrandprojetRepository.save(allOfThem);

    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/AjouterPetitProjet")
    void addLittle(@ModelAttribute postedPetitProjet postedPetitProjet) throws IOException {


        DBFile plan_castral = new DBFile(postedPetitProjet.getPlan_cadastral_file().getOriginalFilename(),
                postedPetitProjet.getPlan_cadastral_file().getContentType(),
                postedPetitProjet.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(plan_castral);
        DBFile plan_alignement = new DBFile(postedPetitProjet.getPlan_cadastral_file().getOriginalFilename(),
                postedPetitProjet.getPlan_cadastral_file().getContentType(),
                postedPetitProjet.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(plan_alignement);
        DBFile contrat_architecte = new DBFile(postedPetitProjet.getPlan_cadastral_file().getOriginalFilename(),
                postedPetitProjet.getPlan_cadastral_file().getContentType(),
                postedPetitProjet.getPlan_cadastral_file().getBytes());
        DBFileRepository.save(contrat_architecte);


        architecte a = (architecte) personneRepository.findOne(postedPetitProjet.getArchitecte_id());

        petitprojet pP = new petitprojet(postedPetitProjet.getDescription(),postedPetitProjet.getBudget(),
                postedPetitProjet.getCommune(),plan_castral.getId(),plan_alignement.getId(),contrat_architecte.getId(),
                a,postedPetitProjet.getCin_proprietaire());

        petitprojetRepository.save(pP);

    }

    @GetMapping("/DeletePetitProjet/{id_petit_projet}")
    void DeletePetitProjet(@PathVariable Long id_petit_projet){
        DBFileRepository.delete(petitprojetRepository.findOne(id_petit_projet).getPlan_cadastral());
        DBFileRepository.delete(petitprojetRepository.findOne(id_petit_projet).getPlan_alignement());
        DBFileRepository.delete(petitprojetRepository.findOne(id_petit_projet).getContrat_architecte());

        petitprojetRepository.delete(id_petit_projet);

    }

    @GetMapping("/DeleteGrandProjet/{id_grand_projet}")
    void DeleteGrandProjet(@PathVariable Long id_grand_projet){
        grandprojet gP = grandprojetRepository.findOne(id_grand_projet);
        DBFileRepository.delete(grandprojetRepository.findOne(id_grand_projet).getPlan_cadastral());
        DBFileRepository.delete(grandprojetRepository.findOne(id_grand_projet).getPlan_alignement());
        DBFileRepository.delete(grandprojetRepository.findOne(id_grand_projet).getContrat_architecte());

        agencegrandprojetRepository.delete(gP.getAgencegrandprojet());
        grandprojetRepository.delete(id_grand_projet);
    }

    @GetMapping("testeee")
    projet aha(){
        projet p = new petitprojet();
        return p;
    }
}
