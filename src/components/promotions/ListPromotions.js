import { React, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import cuid from "cuid";
import CreatePromoPopUp from "./CreatePromoPopUp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Popover } from "antd";
import { Modal } from "antd";

const rows = [
  {
    id: {
      annee_Universitaire: "2013-2014",
      code_Formation: "M2DOSI",
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
      annee_Universitaire: "2021-2024",
      code_Formation: "M2DOSI",
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

const columns = ({ navigate }) => [
  {
    headerName: "Année Universitaire",
    field: "annee_Universitaire",
    type: "string",
    width: 150,
    valueGetter: (params) => `${params.row.id.annee_Universitaire || ""}`,
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
    field: "date_Reponse_Lp",
    headerName: "Date réponse LP",
    type: "string",
    width: 200,
  },
  {
    field: "date_Reponse_Lalp",
    headerName: "Date réponse LP",
    type: "string",
    width: 200,
  },
  {
    field: "date_rentree",
    headerName: "Date réponse LP",
    type: "string",
    width: 200,
  },
  {
    field: "lieu_rentree",
    headerName: "Date réponse LP",
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
    headerName: "details",
    field: "detail",
    width: 200,
    renderCell: (params) => {
      return (
        <Button
          onClick={() =>
            navigate(
              `/promotions/${params.row.id.code_Formation}/${params.row.id.annee_Universitaire}`
            )
          }
        >
          Click
        </Button>
      );
    },
  },
];

const Promotion = () => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ height: 400, width: "95%", margin: "50px" }}>
      <Grid container spacing={2} columns={20}>
        <Grid item xs={17}>
          <h1 className="h1">Promotions DOSI</h1>
        </Grid>
        <Grid item xs={3}>
          {/* <Popover content={content} title="Title" trigger="click">
            <AddBoxIcon fontSize="large" color="primary" />
          </Popover> */}
          <AddBoxIcon fontSize="large" color="primary" onClick={showModal} />

          {/* <Button
            variant="contained"
            onClick={() => navigate("/promotions/create")}
          >
            Ajouter Promotion
          </Button> */}
        </Grid>
      </Grid>

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Modal
            title={<h3>Formulaire d'ajout étudiant</h3>}
            visible={isModalVisible}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            // onOk={handleOk}
            onCancel={handleCancel}
          >
            <CreatePromoPopUp />;
          </Modal>
          <DataGrid
            getRowId={(id) => get(id, "code_Formation", cuid())}
            rows={rows}
            columns={columns({ navigate })}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
