package com.reda.Server.ressource;

import com.reda.Server.model.DBFile;
import com.reda.Server.model.agencegrandprojet;
import com.reda.Server.model.grandprojet;
import com.reda.Server.model.projet;
import com.reda.Server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class responsableRessource {
    @Autowired
    com.reda.Server.repository.projetRepository projetRepository;
    @Autowired
    com.reda.Server.repository.personneRepository personneRepository;
    @Autowired
    com.reda.Server.repository.grandprojetRepository grandprojetRepository;
    @Autowired
    com.reda.Server.repository.agenceRepository agenceRepository;
    @Autowired
    com.reda.Server.repository.DBFileRepository DBFileRepository;
    @Autowired
    com.reda.Server.repository.agencegrandprojetRepository agencegrandprojetRepository;
    @Autowired
    com.reda.Server.repository.petitprojetRepository petitprojetRepository;


    @GetMapping("/GetGrandProjetsByAgence/{id_agence}")
    List<agencegrandprojet> GetGrandProjetsByAgence(@PathVariable Long id_agence){
        return agencegrandprojetRepository.findByAgencee_Id(id_agence);
    }

    @PostMapping("/AjouterRecusAgenceGrandProjet/{id_agence_grand_projet}")
    void AjouterRecusAgenceGrandProjet(@PathVariable Long id_agence_grand_projet,
                                       @NotNull @RequestParam("file") MultipartFile multipartFile) throws IOException {
        DBFile fileEntity = new DBFile(multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                multipartFile.getBytes());
        DBFileRepository.save(fileEntity);

        agencegrandprojet agp = agencegrandprojetRepository.findOne(id_agence_grand_projet);
        if(agp.getRecus() != null){
            DBFileRepository.delete(agp.getRecus());
        }
        agp.setRecus(fileEntity.getId());
        agp.setRecus_statut("En Attente");
        agencegrandprojetRepository.save(agp);
    }



}
