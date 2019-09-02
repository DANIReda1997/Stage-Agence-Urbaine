package com.reda.Server.ressource;

import com.reda.Server.model.agence;
import com.reda.Server.repository.agenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
public class agenceRessource {
    @Autowired
    com.reda.Server.repository.agenceRepository agenceRepository;

    @GetMapping("/getAllAgences")
    List<agence> getAllAgences(){
        return agenceRepository.findAll();
    }

}
