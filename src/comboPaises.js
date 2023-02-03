import React, { Component } from "react";
import axios from "axios";
import "./estilos.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export class ComboPaises extends Component {
  state = {
    Paises: [],
    Pais: {},
  };

  componentDidMount() {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        this.state.Paises.push(response.data[i].name.common);
      }
    });
  }

  seleccionPais(value) {
    axios
      .get(`https://restcountries.com/v3.1/name/${value}`)
      .then((response) => {
        this.setState({
          Pais: {
            nombre: response.data[0].name.common,
            capital: response.data[0].capital,
            region: response.data[0].region,
            subRegion: response.data[0].subregion,
            habitantes: response.data[0].population,
            codigo: response.data[0].cioc,
            bandera: response.data[0].flags.png,
            area: response.data[0].area,
            escudo: response.data[0].coatOfArms.png,
          },
        });
      });
  }

  render() {
    return (
      <div class="paises-container">
        <Autocomplete
          disablePortal
          id="combo-box"
          options={this.state.Paises}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Seleccione un país" />
          )}
          onChange={(event, value) => this.seleccionPais(value)}
        />
        {this.state.Pais.nombre !== undefined && (
          <div class="paises-container">
            <h1>
              {this.state.Pais.nombre} - {this.state.Pais.codigo}
            </h1>
            <hr></hr>
            <div class="column">
              <img
                src={this.state.Pais.bandera}
                alt=""
                width="250"
                height="150"
              />
            </div>
            <img src={this.state.Pais.escudo} alt="" width="150" height="150" />
            <div class="column"></div>
            <h2>Capital: {this.state.Pais.capital}</h2>
            <h2>
              Región: {this.state.Pais.region}, {this.state.Pais.subRegion}
            </h2>
            <h2>Superficie: {this.state.Pais.area} ㎢</h2>
            <h2>
              Habitantes:{" "}
              {Intl.NumberFormat("de-DE").format(this.state.Pais.habitantes)}
            </h2>
          </div>
        )}
      </div>
    );
  }
}
