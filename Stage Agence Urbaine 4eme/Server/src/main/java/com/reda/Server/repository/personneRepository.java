package com.reda.Server.repository;

import com.reda.Server.model.personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface personneRepository extends JpaRepository<personne,Long> {
    personne getByLoginAndPassword(String login,String password);
}
