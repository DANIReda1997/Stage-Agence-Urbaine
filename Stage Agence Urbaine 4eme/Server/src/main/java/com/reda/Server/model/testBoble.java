package com.reda.Server.model;

import javax.persistence.*;

@Entity
public class testBoble {
    @Id
    @GeneratedValue
    private Long id;

    @Lob
    @Column(length = 20000000)
    private byte[] plan;

    public testBoble() {
    }

    public testBoble(byte[] plan) {
        this.plan = plan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPlan() {
        return plan;
    }

    public void setPlan(byte[] plan) {
        this.plan = plan;
    }
}