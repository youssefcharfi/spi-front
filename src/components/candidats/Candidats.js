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
