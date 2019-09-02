package com.reda.Server.repository;

import com.reda.Server.model.architecte;
import com.reda.Server.model.projet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface projetRepository extends JpaRepository<projet,Long> {
    Set<projet> findAllByArchi(architecte architecte);
}
