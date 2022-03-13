import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
function Candidats({ candidats }) {
  console.log(candidats);
  //   candidats = [];
  candidats = [
    {
      noCandidat: "10",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Afkir",
      prenom: "Zakaria",
      sexe: "H",
      dateNaissance: "1992-02-09",
      lieuNaissance: "Tanger",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 61 13 60 05",
      email: "afkir.zakaria@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UAE",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "N",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "20",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Ait El Hafiane",
      prenom: "Adnane",
      sexe: "H",
      dateNaissance: "1999-09-03",
      lieuNaissance: "Marrakech",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 64 32 76 85",
      email: "Ait.adnane@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UCAM",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "30",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Ait M'Barek",
      prenom: "Hamza",
      sexe: "H",
      dateNaissance: "1991-11-02",
      lieuNaissance: "Agadir",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "07 82 34 89 60",
      email: "hamza.aitmbarek@edu.uiz.ac.ma",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIZ",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "N",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "40",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Aterhzaz",
      prenom: "Mohcine",
      sexe: "H",
      dateNaissance: "1991-05-29",
      lieuNaissance: "Marrakech",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 64 94 22 68",
      email: "aterhzaz.tr@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UCAM",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "N",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "50",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Barghane",
      prenom: "Youssef",
      sexe: "H",
      dateNaissance: "1992-09-11",
      lieuNaissance: "Agadir",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "07 82 73 87 30",
      email: "youssef.barghane@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIZ",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "60",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Baroudi",
      prenom: "Soufiane",
      sexe: "H",
      dateNaissance: "1992-02-20",
      lieuNaissance: "Agadir",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 61 13 60 05",
      email: "soufiane.baroudi@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIZ",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "70",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Bousraref",
      prenom: "Badr",
      sexe: "H",
      dateNaissance: "1991-07-18",
      lieuNaissance: "Kénitra",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "07 82 52 47 08",
      email: "bousraref.badr@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIT",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "80",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "Chaabi",
      prenom: "Laila",
      sexe: "F",
      dateNaissance: "1992-02-04",
      lieuNaissance: "Kénitra",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "07 54 49 92 69",
      email: "laila.chaabi@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIT",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "90",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "El Arbaoui",
      prenom: "Salwa",
      sexe: "F",
      dateNaissance: "1992-08-01",
      lieuNaissance: "Tanger",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 64 41 28 05",
      email: "salwaelarbaoui@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UAE",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
    {
      noCandidat: "100",
      codeFormation: "M2DOSI",
      anneeUniversitaire: "2014-2015",
      nom: "El Archaoui",
      prenom: "Samira",
      sexe: "F",
      dateNaissance: "1990-12-23",
      lieuNaissance: "Kénitra",
      nationalite: "Marocaine",
      telephone: null,
      mobile: "06 64 85 76 53",
      email: "elharchaouisamira@gmail.com",
      adresse: "4 avenue Hassan 1er",
      codePostal: "40000",
      ville: "MARRAKECH",
      paysOrigine: "MA",
      universiteOrigine: "UIT",
      listeSelection: "LP",
      selectionNoOrdre: null,
      confirmationCandidat: "O",
      dateReponseCandidat: null,
    },
  ];

  const columns = [
    { field: "prenom", headerName: "Prenom", width: 130 },
    { field: "nom", headerName: "Nom", width: 130 },
    { field: "email", headerName: "Email", minWidth: 250 },
    {
      field: "universiteOrigine",
      headerName: "Universite d'origine",
      width: 145,
      //description: "This column has a value getter and is not sortable.",
      //   sortable: false,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "listeSelection", headerName: "listeSelection", width: 105 },
    {
      field: "selectionNoOrdre",
      headerName: "selectionNoOrdre",
      type: "number",
      width: 150,
    },

    // {
    //   field: "confirmationCandidat",
    //   headerName: "confirmationCandidat",
    //   width: 160,
    //   valueGetter: (params) => {
    //     <AddBoxIcon fontSize="large" color="primary" />;
    //   },
    //   //   `${params.row.enseignantByNoEnseignant.nom || ""}` +
    //   //   ` ${params.row.enseignantByNoEnseignant.prenom}`,
    // },
    {
      headerName: "confirmationCandidat",
      field: "detail",
      width: 200,
      style: { JustifyContent: "center" },
      renderCell: (params) => {
        return params.row.confirmationCandidat == "O" ? (
          <CheckBoxIcon fontSize="large" color="success" />
        ) : (
          <CheckBoxIcon fontSize="large" color="error" />
        );
      },
    },
  ];

  return (
    <div style={{ height: 375, maxWidth: "75%" }}>
      {candidats.length > 0 ? (
        <DataGrid
          rows={candidats}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.noCandidat}
          //   checkboxSelection
        />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Typography color="red" fontSize="30px">
              il n y a pas de candidat à afficher pour cette promotion
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Candidats;
