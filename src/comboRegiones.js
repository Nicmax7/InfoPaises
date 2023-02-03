import React, { Component } from "react";
import axios from "axios";
import "./estilos.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Region(acronym, nombre) {
  this.acronym = acronym;
  this.nombre = nombre;
}

export class ComboRegiones extends Component {
  state = {
    Paises: [],
    Regiones: [],
    PaisesRegion: [],
    Densidad: 0,
  };

  componentDidMount() {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      this.setState({ Paises: response.data });
    });
  }

  obtenerRegiones() {
    this.state.Regiones = [];
    const regionesAgregadas = [];
    for (let i = 0; i < this.state.Paises.length; i++) {
      let bloquesRegionales = this.state.Paises[i].regionalBlocs;
      if (bloquesRegionales !== undefined) {
        for (let j = 0; j < bloquesRegionales.length; j++) {
          if (!regionesAgregadas.includes(bloquesRegionales[j].acronym)) {
            const region = new Region(
              bloquesRegionales[j].acronym,
              bloquesRegionales[j].name
            );
            this.state.Regiones.push(region);
            regionesAgregadas.push(bloquesRegionales[j].acronym);
          }
        }
      }
    }
  }

  PaisesPorRegion(acronym) {
    axios
      .get(`https://restcountries.com/v2/regionalbloc/${acronym}`)
      .then((response) => {
        this.setState({ PaisesRegion: response.data });
        let densidad = 0;
        for (let i = 0; i < response.data.length; i++) {
          densidad += response.data[i].population;
        }
        this.state.Densidad = densidad;
      });
  }

  render() {
    this.obtenerRegiones();
    if (this.state.Regiones.length !== 0) {
      return (
        <div className="paises-container">
          <Autocomplete
            disablePortal
            options={this.state.Regiones}
            getOptionLabel={(option) => option.nombre}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.nombre}
              </Box>
            )}
            sx={{ width: 600 }}
            renderInput={(params) => (
              <TextField {...params} label="Seleccione una región" />
            )}
            onChange={(event, value) => this.PaisesPorRegion(value.acronym)}
          />
          {this.state.PaisesRegion.length !== 0 && (
            <div>
              <h2 class="contenedor">
                Habitantes de la región:{" "}
                {Intl.NumberFormat("de-DE").format(this.state.Densidad)}
              </h2>
              <hr />
              <div class="contenedor">
                {this.state.PaisesRegion.map(function (pais) {
                  return (
                    <div class="columnas">
                      <ul>
                        <h3>{pais.name}</h3>
                        Habitantes:{" "}
                        {Intl.NumberFormat("de-DE").format(pais.population)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}
