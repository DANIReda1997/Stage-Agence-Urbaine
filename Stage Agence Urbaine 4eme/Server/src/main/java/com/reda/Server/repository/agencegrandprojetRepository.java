package com.reda.Server.repository;

import com.reda.Server.model.agencegrandprojet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface agencegrandprojetRepository extends JpaRepository<agencegrandprojet,Long> {

    List<agencegrandprojet> findByAgencee_Id(long agence_id);
}
