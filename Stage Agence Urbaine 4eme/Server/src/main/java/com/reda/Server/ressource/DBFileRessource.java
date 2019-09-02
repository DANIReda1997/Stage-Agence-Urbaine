package com.reda.Server.ressource;


import com.reda.Server.model.DBFile;
import com.reda.Server.repository.DBFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.ThreadLocalRandom;

@CrossOrigin("http://localhost:3000")
@RestController
public class DBFileRessource {


    @Autowired
    DBFileRepository DBFileRepository;


    @CrossOrigin("http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<Void> uploadNewFile(@NotNull @RequestParam("file") MultipartFile multipartFile) throws IOException {
        DBFile fileEntity = new DBFile(multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                multipartFile.getBytes());
        DBFileRepository.save(fileEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("download/{id_plan}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id_plan) {
        long amountOfFiles = DBFileRepository.count();
        Long randomPrimaryKey;
        if (amountOfFiles == 0) {
            return ResponseEntity.ok(new byte[0]);
        } else if (amountOfFiles == 1) {
            randomPrimaryKey = 1L;
        } else {
            randomPrimaryKey = ThreadLocalRandom.current().nextLong(1, amountOfFiles + 1);
        }
        DBFile fileEntity = DBFileRepository.findById(id_plan);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf(fileEntity.getContentType()));
        header.setContentLength(fileEntity.getData().length);
        header.set("Content-Disposition", "attachment; filename=" + fileEntity.getFileName());
        return new ResponseEntity<>(fileEntity.getData(), header, HttpStatus.OK);
    }







}

