import React, { Component } from "react";
import axios from "axios";
export default class testFile extends Component {
  state = {
    file: {},
    msg: ""
  };

  handleChange = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("file", this.state.file);
    data.append("name", this.state.file.name);

    axios.post("http://localhost:8080/upload", data);
  };

  downloadRandomImage = () => {
    fetch("http://localhost:8080/download").then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "plan";
        a.click();
      });
    });
  };

  render() {
    console.log(this.state.file);
    return (
      <div>
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Upload</button>

        <div className="App-intro">
          <h3>Download a random file</h3>
          <button onClick={this.downloadRandomImage}>Download</button>
        </div>
      </div>
    );
  }
}
