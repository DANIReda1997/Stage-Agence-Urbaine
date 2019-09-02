package com.reda.Server.ressource;

import com.reda.Server.model.admin;
import com.reda.Server.model.architecte;
import com.reda.Server.model.personne;
import com.reda.Server.model.responsable;
import com.reda.Server.repository.adminRepository;
import com.reda.Server.repository.personneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class personneRessource {
    @Autowired
    com.reda.Server.repository.personneRepository personneRepository;
    @Autowired
    adminRepository adminRepository;


    @GetMapping("/personneLogin/{login}/{password}")
    personne personneLogin(@PathVariable String login, @PathVariable String password){
        return personneRepository.getByLoginAndPassword(login,password);
    }

}
