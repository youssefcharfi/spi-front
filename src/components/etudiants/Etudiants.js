import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Etudiants({ etudiants }) {
  //   const [etudiants, setEtudiants] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `http://localhost:9000/etudiants?codeformation=${codeFormation}&anneeuniversitaire=${anneUniversitaire}`
  //       )
  //       .then((res) => {
  //         setEtudiants(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  const columns = [
    { field: "noEtudiant", headerName: "Numero Etudiant", width: 130 },
    { field: "nom", headerName: "Nom", width: 130 },
    { field: "prenom", headerName: "Prenom", width: 130 },
    { field: "telephone", headerName: "Telephone", width: 130 },
    { field: "email", headerName: "Email", minWidth: 300 },
    {
      field: "universiteOrigine",
      headerName: "Universite d'origine",
      width: 200,
    },
    { field: "groupeTp", headerName: "Groupe TP", type: Number, width: 130 },
    {
      field: "groupeAnglais",
      headerName: "Groupe Angalis",
      type: Number,
      width: 130,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      {etudiants.length > 0 ? (
        <DataGrid
          rows={etudiants}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.noEtudiant}
          rowsPerPageOptions={[5]}
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
              il n y a pas d'étudiants' à afficher pour cette formation
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
