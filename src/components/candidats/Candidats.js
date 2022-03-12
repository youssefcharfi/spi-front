import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
function Candidats({ candidats }) {
  console.log(candidats);
  //   const [candidats, setCandidats] = useState([
  //     {
  //       adresse: "aaaaaaa",
  //       codePostal: "aaaaaaa",
  //       confirmationCandidat: "aaaaaaa",
  //       dateNaissance: "aaaaaaa",
  //       dateReponseCandidat: "aaaaaaa",
  //       email: "aaaaaaa",
  //       lieuNaissance: "aaaaaaa",
  //       listeSelection: "aaaaaaa",
  //       mobile: "aaaaaaa",
  //       nationalite: "aaaaaaa",
  //       noCandidat: "aaaaaaa",
  //       nom: "aaaaaaa",
  //       paysOrigine: "aaaaaaa",
  //       prenom: "aaaaaaa",
  //       selectionNoOrdre: "aaaaaaa",
  //       sexe: "aaaaaaa",
  //       telephone: "aaaaaaa",
  //       universiteOrigine: "aaaaaaa",
  //       ville: "aaaaaaa",
  //     },
  //     {
  //       adresse: "bbbbbbbb",
  //       codePostal: "bbbbbbbb",
  //       confirmationCandidat: "bbbbbbbb",
  //       dateNaissance: "bbbbbbbb",
  //       dateReponseCandidat: "bbbbbbbb",
  //       email: "bbbbbbbb",
  //       lieuNaissance: "bbbbbbbb",
  //       listeSelection: "bbbbbbbb",
  //       mobile: "bbbbbbbb",
  //       nationalite: "bbbbbbbb",
  //       noCandidat: "bbbbbbbb",
  //       nom: "bbbbbbbb",
  //       paysOrigine: "bbbbbbbb",
  //       prenom: "bbbbbbbb",
  //       selectionNoOrdre: "bbbbbbbb",
  //       sexe: "bbbbbbbb",
  //       telephone: "bbbbbbbb",
  //       universiteOrigine: "bbbbbbbb",
  //       ville: "bbbbbbbb",
  //     },
  //   ]);
  const { codeFormation, anneeUniversitaire } = useParams();

  const columns = [
    { field: "prenom", headerName: "Prenom", width: 130 },
    { field: "nom", headerName: "Nom", width: 130 },
    {
      field: "email",
      headerName: "Email",
      //   type: 'number',
      minWidth: 250,
    },
    {
      field: "universiteOrigine",
      headerName: "Universite d'origine",
      //   description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 145,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "listeSelection", headerName: "listeSelection", width: 105 },
    { field: "selectionNoOrdre", headerName: "selectionNoOrdre", width: 150 },
    {
      field: "confirmationCandidat",
      headerName: "confirmationCandidat",
      width: 160,
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
        <h1> " il n y a pas de candidat à afficher pour cette formation"</h1>
      )}
    </div>
  );
}

export default Candidats;
