package com.reda.Server.UsedModels;

public class Statistique {
    private Long nbr_projet;
    private Long nbr_grand_projet;
    private Long nbr_petit_projet;
    private Long nbr_grand_projet_approuver;
    private Long nbr_grand_projet_annuler;
    private Long nbr_grand_projet_waiting;
    private Long nbr_petit_projet_approuver;
    private Long nbr_petit_projet_annuler;
    private Long nbr_petit_projet_waiting;

    public Statistique() {
    }

    public Statistique(Long nbr_projet, Long nbr_grand_projet, Long nbr_petit_projet, Long nbr_grand_projet_approuver, Long nbr_grand_projet_annuler, Long nbr_grand_projet_waiting, Long nbr_petit_projet_approuver, Long nbr_petit_projet_annuler, Long nbr_petit_projet_waiting) {
        this.nbr_projet = nbr_projet;
        this.nbr_grand_projet = nbr_grand_projet;
        this.nbr_petit_projet = nbr_petit_projet;
        this.nbr_grand_projet_approuver = nbr_grand_projet_approuver;
        this.nbr_grand_projet_annuler = nbr_grand_projet_annuler;
        this.nbr_grand_projet_waiting = nbr_grand_projet_waiting;
        this.nbr_petit_projet_approuver = nbr_petit_projet_approuver;
        this.nbr_petit_projet_annuler = nbr_petit_projet_annuler;
        this.nbr_petit_projet_waiting = nbr_petit_projet_waiting;
    }

    public Long getNbr_projet() {
        return nbr_projet;
    }

    public void setNbr_projet(Long nbr_projet) {
        this.nbr_projet = nbr_projet;
    }

    public Long getNbr_grand_projet() {
        return nbr_grand_projet;
    }

    public void setNbr_grand_projet(Long nbr_grand_projet) {
        this.nbr_grand_projet = nbr_grand_projet;
    }

    public Long getNbr_petit_projet() {
        return nbr_petit_projet;
    }

    public void setNbr_petit_projet(Long nbr_petit_projet) {
        this.nbr_petit_projet = nbr_petit_projet;
    }

    public Long getNbr_grand_projet_approuver() {
        return nbr_grand_projet_approuver;
    }

    public void setNbr_grand_projet_approuver(Long nbr_grand_projet_approuver) {
        this.nbr_grand_projet_approuver = nbr_grand_projet_approuver;
    }

    public Long getNbr_grand_projet_annuler() {
        return nbr_grand_projet_annuler;
    }

    public void setNbr_grand_projet_annuler(Long nbr_grand_projet_annuler) {
        this.nbr_grand_projet_annuler = nbr_grand_projet_annuler;
    }

    public Long getNbr_grand_projet_waiting() {
        return nbr_grand_projet_waiting;
    }

    public void setNbr_grand_projet_waiting(Long nbr_grand_projet_waiting) {
        this.nbr_grand_projet_waiting = nbr_grand_projet_waiting;
    }

    public Long getNbr_petit_projet_approuver() {
        return nbr_petit_projet_approuver;
    }

    public void setNbr_petit_projet_approuver(Long nbr_petit_projet_approuver) {
        this.nbr_petit_projet_approuver = nbr_petit_projet_approuver;
    }

    public Long getNbr_petit_projet_annuler() {
        return nbr_petit_projet_annuler;
    }

    public void setNbr_petit_projet_annuler(Long nbr_petit_projet_annuler) {
        this.nbr_petit_projet_annuler = nbr_petit_projet_annuler;
    }

    public Long getNbr_petit_projet_waiting() {
        return nbr_petit_projet_waiting;
    }

    public void setNbr_petit_projet_waiting(Long nbr_petit_projet_waiting) {
        this.nbr_petit_projet_waiting = nbr_petit_projet_waiting;
    }
}
