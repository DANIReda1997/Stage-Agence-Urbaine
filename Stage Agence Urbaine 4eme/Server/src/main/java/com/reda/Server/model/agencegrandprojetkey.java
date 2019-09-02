package com.reda.Server.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class agencegrandprojetkey implements Serializable {
    private Long agenceid;
    private Long grandprojetid;

    public agencegrandprojetkey() {
    }

    public agencegrandprojetkey(Long agenceid, Long grandprojetid) {
        this.agenceid = agenceid;
        this.grandprojetid = grandprojetid;
    }

    public Long getAgenceid() {
        return agenceid;
    }

    public void setAgenceid(Long agenceid) {
        this.agenceid = agenceid;
    }

    public Long getGrandprojetid() {
        return grandprojetid;
    }

    public void setGrandprojetid(Long grandprojetid) {
        this.grandprojetid = grandprojetid;
    }
}
