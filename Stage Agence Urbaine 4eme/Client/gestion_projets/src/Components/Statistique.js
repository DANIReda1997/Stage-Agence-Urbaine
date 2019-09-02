import React, { Component } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default class Statistique extends Component {
  state = {
    stats: {}
  };
  async componentWillMount() {
    await axios.get("http://localhost:8080/GetStatistique").then(response =>
      this.setState({
        stats: response.data
      })
    );
  }
  render() {
    const { stats } = this.state;
    const data = {
      labels: [
        "Waiting " +
          "(" +
          Math.trunc(
            (stats.nbr_petit_projet_waiting * 100) / stats.nbr_petit_projet
          ) +
          "%)",
        "Annuler " +
          "(" +
          Math.trunc(
            (stats.nbr_petit_projet_annuler * 100) / stats.nbr_petit_projet
          ) +
          "%)",
        "Approuver " +
          "(" +
          Math.trunc(
            (stats.nbr_petit_projet_approuver * 100) / stats.nbr_petit_projet
          ) +
          "%)"
      ],
      datasets: [
        {
          data: [
            stats.nbr_petit_projet_waiting,
            stats.nbr_petit_projet_annuler,
            stats.nbr_petit_projet_approuver
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };
    const dataa = {
      labels: [
        "Waiting " +
          "(" +
          Math.trunc(
            (stats.nbr_grand_projet_waiting * 100) / stats.nbr_grand_projet
          ) +
          "%)",
        "Annuler " +
          "(" +
          Math.trunc(
            (stats.nbr_grand_projet_annuler * 100) / stats.nbr_grand_projet
          ) +
          "%)",
        "Approuver " +
          "(" +
          Math.trunc(
            (stats.nbr_grand_projet_approuver * 100) / stats.nbr_grand_projet
          ) +
          "%)"
      ],
      datasets: [
        {
          data: [
            stats.nbr_grand_projet_waiting,
            stats.nbr_grand_projet_annuler,
            stats.nbr_grand_projet_approuver
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };
    console.log(stats);
    return (
      <div className="container">
        <div className="row mt-4">
          <h1 className="display-4 mb-2 col-5 shadow ">
            <span className="text-danger">Petits</span> Projets{" ("}
            <strong>{stats.nbr_petit_projet}</strong>
            {")"}
          </h1>
          <h4 className="display-4 mb-2 col-5 shadow offset-2">
            <span className="text-danger">Grands</span> Projets{" ("}
            <strong>{stats.nbr_grand_projet}</strong>
            {")"}
          </h4>
        </div>
        <div className="row mt-4">
          <div className="col-5">
            <Pie data={data} width="1000" height="1000" />
          </div>
          <div className="col-5 offset-2">
            <Pie data={dataa} width="1000" height="1000" />
          </div>
        </div>
      </div>
    );
  }
}
