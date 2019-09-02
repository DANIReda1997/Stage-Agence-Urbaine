package com.reda.Server.ressource;


import com.reda.Server.model.agencegrandprojet;
import com.reda.Server.model.grandprojet;
import com.reda.Server.model.projet;
import com.reda.Server.repository.agencegrandprojetRepository;
import com.reda.Server.repository.grandprojetRepository;
import com.reda.Server.repository.projetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
 @CrossOrigin("http://localhost:3000")
public class adminRessource {

    @Autowired
    projetRepository projetRepository;
    @Autowired
    agencegrandprojetRepository agencegrandprojetRepository;
    @Autowired
    grandprojetRepository grandprojetRepository;


    @GetMapping("/GetAllProjetForAdmin")
    List<projet> GetAllProjetForAdmin(){
        return projetRepository.findAll();
    }


    @GetMapping("/ModifierStatutPetitProjet/{id_petit_projet}/{action}")
    void ModifierStatutPetitProjet(@PathVariable Long id_petit_projet, @PathVariable String action){
        projet p = projetRepository.findOne(id_petit_projet);
        p.setStatut(action);
        projetRepository.save(p);
    }

    @GetMapping("/ModifierStatutGrandProjet/{id_grand_projet}/{action}")
    void ModifierStatutGrandProjet(@PathVariable Long id_grand_projet, @PathVariable String action){
        grandprojet p = (grandprojet) projetRepository.findOne(id_grand_projet);
        p.setStatut(action);
        projetRepository.save(p);
    }

    @GetMapping("/ModifierStatutRecusPartBudget/{id_agence_grand_projet}/{action}")
    void ModifierStatutRecusPartBudget(@PathVariable Long id_agence_grand_projet,@PathVariable String action){
        agencegrandprojet agp = agencegrandprojetRepository.findOne(id_agence_grand_projet);
        agp.setRecus_statut(action);
        if(action.equals("Approuver"))
            agp.setPayer(true);

        agencegrandprojetRepository.save(agp);
    }

    @GetMapping("/HasEveryAgencePayed/{id_grand_projet}")
    boolean HasEveryAgencePayed(@PathVariable Long id_grand_projet){
        grandprojet gp = grandprojetRepository.findOne(id_grand_projet);
        for(agencegrandprojet agp : gp.getAgencegrandprojet()){
            if(agp.isPayer() == false)
                return false;
        }
        return true;

    }
}
