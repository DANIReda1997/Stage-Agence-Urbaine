package com.reda.Server.ressource;

import com.reda.Server.UsedModels.Statistique;
import com.reda.Server.model.projet;
import com.reda.Server.repository.projetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class statistiqueRessource {
    @Autowired
    projetRepository projetRepository;

    @GetMapping("/GetStatistique")
    Statistique getStatistique(){
        List<projet> Tous = projetRepository.findAll();
        Statistique stats=new Statistique();
        Long nbr_projet = Long.valueOf(0);
        Long nbr_grand_projet =Long.valueOf(0);
        Long nbr_petit_projet=Long.valueOf(0);
        Long nbr_grand_projet_approuver=Long.valueOf(0);
        Long nbr_grand_projet_annuler=Long.valueOf(0);
        Long nbr_grand_projet_waiting=Long.valueOf(0);
        Long nbr_petit_projet_approuver=Long.valueOf(0);
        Long nbr_petit_projet_annuler=Long.valueOf(0);
        Long nbr_petit_projet_waiting=Long.valueOf(0);

        for(projet p: Tous){
            nbr_projet+=1;
            if(p.getGrandoupetit().equals("grand")){
                nbr_grand_projet+=1;
                if(p.getStatut().equals("Annuler"))
                    nbr_grand_projet_annuler+=1;
                else if(p.getStatut().equals("Approuver"))
                    nbr_grand_projet_approuver+=1;
                else if(p.getStatut().equals("Waiting"))
                    nbr_grand_projet_waiting+=1;
            }
            if(p.getGrandoupetit().equals("petit")){
                nbr_petit_projet+=1;
                if(p.getStatut().equals("Annuler"))
                    nbr_petit_projet_annuler+=1;
                else if(p.getStatut().equals("Approuver"))
                    nbr_petit_projet_approuver+=1;
                else if(p.getStatut().equals("Waiting"))
                    nbr_petit_projet_waiting+=1;
            }
        }
        stats.setNbr_projet(nbr_projet);
        stats.setNbr_grand_projet(nbr_grand_projet);
        stats.setNbr_grand_projet_annuler(nbr_grand_projet_annuler);
        stats.setNbr_grand_projet_approuver(nbr_grand_projet_approuver);
        stats.setNbr_grand_projet_waiting(nbr_grand_projet_waiting);
        stats.setNbr_petit_projet(nbr_petit_projet);
        stats.setNbr_petit_projet_annuler(nbr_petit_projet_annuler);
        stats.setNbr_petit_projet_approuver(nbr_petit_projet_approuver);
        stats.setNbr_petit_projet_waiting(nbr_petit_projet_waiting);


        return stats;
    }


}
