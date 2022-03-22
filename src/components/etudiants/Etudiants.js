import React, { useEffect, useState } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
// import axios from "axios";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Etudiants({ etudiants }) {
  const columns = [
    // { field: "noEtudiant", headerName: "Numéro", flex: 0.3 },
    { field: "nom", headerName: "Nom", flex: 0.4 },
    { field: "prenom", headerName: "Prenom", flex: 0.3 },
    { field: "mobile", headerName: "mobile", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.6 },
    {
      field: "universiteOrigine",
      headerName: "Universite d'origine",
      flex: 0.4,
      align: "center",
    },
    {
      field: "groupeTp",
      headerName: "Groupe TP",
      type: Number,
      flex: 0.25,
      align: "center",
    },
    {
      field: "groupeAnglais",
      headerName: "Groupe Anglais",
      type: Number,
      flex: 0.3,
      align: "center",
    },
  ];
  return (
    <Container style={{ height: 426.5 }} maxWidth>
      {etudiants.length > 0 ? (
        <DataGrid
          rows={etudiants}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.noEtudiant}
          rowsPerPageOptions={[5]}
          style={{ height: "87%" }}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: "nom",
                  sort: "asc",
                },
              ],
            },
          }}
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
            <Typography color="darkGray" fontSize="30px">
              il n y a pas d'étudiants à afficher pour cette promotion
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
