import React from "react";
import ReactDOM from "react-dom/client";
import { ComboPaises } from "./comboPaises";
import { ComboRegiones } from "./comboRegiones";
import "./estilos.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div class="BigRow">
    <div class="bigColumnPaises">
      <ComboPaises />
    </div>
    <div class="bigColumnRegiones">
      <ComboRegiones />
    </div>
  </div>
);
