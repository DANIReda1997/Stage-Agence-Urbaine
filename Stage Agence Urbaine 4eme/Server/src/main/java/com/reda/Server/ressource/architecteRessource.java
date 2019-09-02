package com.reda.Server.ressource;

import com.reda.Server.repository.agenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class architecteRessource {
    @Autowired
    com.reda.Server.repository.agenceRepository agenceRepository;



}
