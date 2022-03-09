import React from "react";
import { Row, Col, Divider, Button } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import get from "lodash/get";
import cuid from "cuid";

const rows = [
  {
    id: {
      annee_Universitaire: "2013-2016",
      code_Formation: "M2DOSII",
    },
    commentaire: null,
    date_Rentree: "2013-09-07",
    date_Reponse_Lalp: "1999-05-05",
    date_Reponse_Lp: "2013-05-04",
    lieu_Rentree: "LC117B",
    nb_Max_Etudiant: 25,
    processus_Stage: "EC",
    sigle_Promotion: "DOSI4",
    enseignant: {
      no_Enseignant: 0,
      adresse: "Iure ut ut aliquam e",
      code_Postal: "13",
      email_Perso: "ryvycyj@mailinator.com",
      email_Ubo: "kykynu@mailinator.com",
      mobile: "+33615469821",
      nom: "Minus saepe perspici",
      pays: "Maroc",
      prenom: "Culpa soluta quas e",
      sexe: "H",
      telephone: "+33615469821",
      type: null,
      ville: "Fes",
    },
  },
  {
    id: {
      annee_Universitaire: "2013-2014",
      code_Formation: "M2DOSI2",
    },
    commentaire: null,
    date_Rentree: "2013-09-07",
    date_Reponse_Lalp: "1999-05-05",
    date_Reponse_Lp: "2013-05-04",
    lieu_Rentree: "LC117B",
    nb_Max_Etudiant: 25,
    processus_Stage: "EC",
    sigle_Promotion: "DOSI4",
    enseignant: {
      no_Enseignant: 0,
      adresse: "Iure ut ut aliquam e",
      code_Postal: "13",
      email_Perso: "ryvycyj@mailinator.com",
      email_Ubo: "kykynu@mailinator.com",
      mobile: "+33615469821",
      nom: "Minus saepe perspici",
      pays: "Maroc",
      prenom: "Culpa soluta quas e",
      sexe: "H",
      telephone: "+33615469821",
      type: null,
      ville: "Fes",
    },
  },
  {
    id: {
      annee_Universitaire: "2017-2018",
      code_Formation: "M2DOSI3",
    },
    commentaire: null,
    date_Rentree: "2013-09-07",
    date_Reponse_Lalp: "1999-05-05",
    date_Reponse_Lp: "2013-05-04",
    lieu_Rentree: "LC117B",
    nb_Max_Etudiant: 25,
    processus_Stage: "EC",
    sigle_Promotion: "DOSI4",
    enseignant: {
      no_Enseignant: 0,
      adresse: "Iure ut ut aliquam e",
      code_Postal: "13",
      email_Perso: "ryvycyj@mailinator.com",
      email_Ubo: "kykynu@mailinator.com",
      mobile: "+33615469821",
      nom: "Minus saepe perspici",
      pays: "Maroc",
      prenom: "Culpa soluta quas e",
      sexe: "H",
      telephone: "+33615469821",
      type: null,
      ville: "Fes",
    },
  },
  {
    id: {
      annee_Universitaire: "2019-2020",
      code_Formation: "M2DOSI6",
    },
    commentaire: null,
    date_Rentree: "2013-09-07",
    date_Reponse_Lalp: "1999-05-05",
    date_Reponse_Lp: "2013-05-04",
    lieu_Rentree: "LC117B",
    nb_Max_Etudiant: 25,
    processus_Stage: "EC",
    sigle_Promotion: "DOSI4",
    enseignant: {
      no_Enseignant: 0,
      adresse: "Iure ut ut aliquam e",
      code_Postal: "13",
      email_Perso: "ryvycyj@mailinator.com",
      email_Ubo: "kykynu@mailinator.com",
      mobile: "+33615469821",
      nom: "Minus saepe perspici",
      pays: "Maroc",
      prenom: "Culpa soluta quas e",
      sexe: "H",
      telephone: "+33615469821",
      type: null,
      ville: "Fes",
    },
  },
  {
    id: {
      annee_Universitaire: "2021-2022",
      code_Formation: "M2DOSI7",
    },
    commentaire: null,
    date_Rentree: "2013-09-07",
    date_Reponse_Lalp: "1999-05-05",
    date_Reponse_Lp: "2013-05-04",
    lieu_Rentree: "LC117B",
    nb_Max_Etudiant: 25,
    processus_Stage: "EC",
    sigle_Promotion: "DOSI4",
    enseignant: {
      no_Enseignant: 0,
      adresse: "Iure ut ut aliquam e",
      code_Postal: "13",
      email_Perso: "ryvycyj@mailinator.com",
      email_Ubo: "kykynu@mailinator.com",
      mobile: "+33615469821",
      nom: "Minus saepe perspici",
      pays: "Maroc",
      prenom: "Culpa soluta quas e",
      sexe: "H",
      telephone: "+33615469821",
      type: null,
      ville: "Fes",
    },
  },
];

const columns = [
  {
    headerName: "Code Formation",
    field: "code_Formation",
    type: "string",
    width: 200,
    valueGetter: (params) => `${params.row.id.code_Formation || ""}`,
  },
  {
    headerName: "Enseignant",
    field: "enseignant",
    type: "string",
    width: 300,
    valueGetter: (params) =>
      `${params.row.enseignant.nom || ""}` + `${params.row.enseignant.prenom}`,
  },
  {
    headerName: "Année Universitaire",
    field: "annee_Universitaire",
    type: "string",
    width: 150,
    valueGetter: (params) => `${params.row.id.annee_Universitaire || ""}`,
  },
  {
    field: "sigle_Promotion",
    headerName: "Sigle Promotion",
    type: "string",
    width: 200,
  },
  {
    field: "nb_Max_Etudiant",
    headerName: "Nombre max des étudiants",
    type: "string",
    width: 200,
  },
  {
    field: "processus_Stage",
    headerName: "Processus Stage",
    type: "string",
    width: 200,
  },
  {
    field: "date_Reponse_Lp",
    headerName: "Date réponse LP",
    type: "string",
    width: 200,
  },
];

const Promotion = () => {
  return (
    <div style={{ height: 400, width: "95%", margin: "50px" }}>
      <Row justify="space-between">
        <h1 className="h1">Promotions</h1>
        <Button type="primary" onClick={() => {}}>
          Ajouter
        </Button>
      </Row>
      <Divider />
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            getRowId={(id) => get(id, "code_Formation", cuid())}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
