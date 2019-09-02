package com.reda.Server.ressource;

import com.reda.Server.model.*;
import com.reda.Server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class testRessource {

    @Autowired
    architecteRepository architecteRepository;
    @Autowired
    projetRepository projetRepository;
    @Autowired
    responsableRepository responsableRepository;
    @Autowired
    agenceRepository agenceRepository;
    @Autowired
    grandprojetRepository grandprojetRepository;
    @Autowired
    agencegrandprojetRepository agencegrandprojetRepository;

    @GetMapping("/test")
    void testFunc(){

    }




}
