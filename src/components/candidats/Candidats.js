import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
function Candidats() {
  const [candidats, setCandidats] = useState([
    {
      adresse: "aaaaaaa",
      codePostal: "aaaaaaa",
      confirmationCandidat: "aaaaaaa",
      dateNaissance: "aaaaaaa",
      dateReponseCandidat: "aaaaaaa",
      email: "aaaaaaa",
      lieuNaissance: "aaaaaaa",
      listeSelection: "aaaaaaa",
      mobile: "aaaaaaa",
      nationalite: "aaaaaaa",
      noCandidat: "aaaaaaa",
      nom: "aaaaaaa",
      paysOrigine: "aaaaaaa",
      prenom: "aaaaaaa",
      selectionNoOrdre: "aaaaaaa",
      sexe: "aaaaaaa",
      telephone: "aaaaaaa",
      universiteOrigine: "aaaaaaa",
      ville: "aaaaaaa",
    },
    {
      adresse: "bbbbbbbb",
      codePostal: "bbbbbbbb",
      confirmationCandidat: "bbbbbbbb",
      dateNaissance: "bbbbbbbb",
      dateReponseCandidat: "bbbbbbbb",
      email: "bbbbbbbb",
      lieuNaissance: "bbbbbbbb",
      listeSelection: "bbbbbbbb",
      mobile: "bbbbbbbb",
      nationalite: "bbbbbbbb",
      noCandidat: "bbbbbbbb",
      nom: "bbbbbbbb",
      paysOrigine: "bbbbbbbb",
      prenom: "bbbbbbbb",
      selectionNoOrdre: "bbbbbbbb",
      sexe: "bbbbbbbb",
      telephone: "bbbbbbbb",
      universiteOrigine: "bbbbbbbb",
      ville: "bbbbbbbb",
    },
  ]);
  const { codeFormation, anneeUniversitaire } = useParams();

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `http://localhost:9000/candidats?anneeUniversitaire=${anneeUniversitaire}&codeFormation=${codeFormation}`
  //       )
  //       .then((res) => {
  //         setCandidats(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "prenom", headerName: "prenom", width: 130 },
    { field: "nom", headerName: "nom", width: 130 },
    {
      field: "email",
      headerName: "email",
      //   type: 'number',
      width: 90,
    },
    {
      field: "universiteOrigine",
      headerName: "universiteOrigine",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "listeSelection", headerName: "listeSelection", width: 130 },
    { field: "selectionNoOrdre", headerName: "selectionNoOrdre", width: 130 },
    {
      field: "confirmationCandidat",
      headerName: "confirmationCandidat",
      width: 130,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={candidats}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.noCandidat}
        checkboxSelection
      />
    </div>
  );
}

export default Candidats;
