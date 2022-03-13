import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
function Candidats({ candidats }) {
  console.log(candidats);
  //   candidats = [];

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
      //   sortable: false,
      width: 145,
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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Typography color="red" fontSize="30px">
              il n y a pas de candidat à afficher pour cette formation
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Candidats;
