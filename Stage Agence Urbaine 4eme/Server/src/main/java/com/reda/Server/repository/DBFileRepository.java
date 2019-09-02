package com.reda.Server.repository;

import com.reda.Server.model.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DBFileRepository extends JpaRepository<DBFile,Long> {
    DBFile findById(Long fileId);
}
