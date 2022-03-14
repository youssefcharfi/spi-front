import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import cuid from "cuid";
import CreatePromoPopUp from "./CreatePromoPopUp";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Popover } from "antd";
import { Modal } from "antd";
import axios from "axios";

// const rows = [
//   {
//     id: {
//       anneeUniversitaire: "2013-2014",
//       codeFormation: "M2DOSI",
//     },
//     commentaire: null,
//     dateRentree: "2013-09-07",
//     dateReponseLalp: "1999-05-05",
//     dateReponseLp: "2013-05-04",
//     lieuRentree: "LC117B",
//     nbMaxEtudiant: 25,
//     processusStage: "EC",
//     siglePromotion: "DOSI4",
//     enseignant: {
//       noEnseignant: 0,
//       adresse: "Iure ut ut aliquam e",
//       codePostal: "13",
//       emailPerso: "ryvycyj@mailinator.com",
//       emailUbo: "kykynu@mailinator.com",
//       mobile: "+33615469821",
//       nom: "Minus saepe perspici",
//       pays: "Maroc",
//       prenom: "Culpa soluta quas e",
//       sexe: "H",
//       telephone: "+33615469821",
//       type: null,
//       ville: "Fes",
//     },
//   },
//   {
//     id: {
//       anneeUniversitaire: "2021-2024",
//       codeFormation: "M2DOSI",
//     },
//     commentaire: null,
//     dateRentree: "2013-09-07",
//     dateReponseLalp: "1999-05-05",
//     dateReponseLp: "2013-05-04",
//     lieuRentree: "LC117B",
//     nbMaxEtudiant: 25,
//     processusStage: "EC",
//     siglePromotion: "DOSI4",
//     enseignant: {
//       noEnseignant: 0,
//       adresse: "Iure ut ut aliquam e",
//       codePostal: "13",
//       emailPerso: "ryvycyj@mailinator.com",
//       emailUbo: "kykynu@mailinator.com",
//       mobile: "+33615469821",
//       nom: "Minus saepe perspici",
//       pays: "Maroc",
//       prenom: "Culpa soluta quas e",
//       sexe: "H",
//       telephone: "+33615469821",
//       type: null,
//       ville: "Fes",
//     },
//   },
//   {
//     id: {
//       anneeUniversitaire: "2017-2018",
//       codeFormation: "M2DOSI3",
//     },
//     commentaire: null,
//     dateRentree: "2013-09-07",
//     dateReponseLalp: "1999-05-05",
//     dateReponseLp: "2013-05-04",
//     lieuRentree: "LC117B",
//     nbMaxEtudiant: 25,
//     processusStage: "EC",
//     siglePromotion: "DOSI4",
//     enseignant: {
//       noEnseignant: 0,
//       adresse: "Iure ut ut aliquam e",
//       codePostal: "13",
//       emailPerso: "ryvycyj@mailinator.com",
//       emailUbo: "kykynu@mailinator.com",
//       mobile: "+33615469821",
//       nom: "Minus saepe perspici",
//       pays: "Maroc",
//       prenom: "Culpa soluta quas e",
//       sexe: "H",
//       telephone: "+33615469821",
//       type: null,
//       ville: "Fes",
//     },
//   },
//   {
//     id: {
//       anneeUniversitaire: "2019-2020",
//       codeFormation: "M2DOSI6",
//     },
//     commentaire: null,
//     dateRentree: "2013-09-07",
//     dateReponseLalp: "1999-05-05",
//     dateReponseLp: "2013-05-04",
//     lieuRentree: "LC117B",
//     nbMaxEtudiant: 25,
//     processusStage: "EC",
//     siglePromotion: "DOSI4",
//     enseignant: {
//       noEnseignant: 0,
//       adresse: "Iure ut ut aliquam e",
//       codePostal: "13",
//       emailPerso: "ryvycyj@mailinator.com",
//       emailUbo: "kykynu@mailinator.com",
//       mobile: "+33615469821",
//       nom: "Minus saepe perspici",
//       pays: "Maroc",
//       prenom: "Culpa soluta quas e",
//       sexe: "H",
//       telephone: "+33615469821",
//       type: null,
//       ville: "Fes",
//     },
//   },
//   {
//     id: {
//       annee_Universitaire: "2021-2022",
//       code_Formation: "M2DOSI7",
//     },
//     commentaire: null,
//     date_Rentree: "2013-09-07",
//     date_Reponse_Lalp: "1999-05-05",
//     date_Reponse_Lp: "2013-05-04",
//     lieu_Rentree: "LC117B",
//     nb_Max_Etudiant: 25,
//     processus_Stage: "EC",
//     sigle_Promotion: "DOSI4",
//     enseignant: {
//       no_Enseignant: 0,
//       adresse: "Iure ut ut aliquam e",
//       code_Postal: "13",
//       email_Perso: "ryvycyj@mailinator.com",
//       email_Ubo: "kykynu@mailinator.com",
//       mobile: "+33615469821",
//       nom: "Minus saepe perspici",
//       pays: "Maroc",
//       prenom: "Culpa soluta quas e",
//       sexe: "H",
//       telephone: "+33615469821",
//       type: null,
//       ville: "Fes",
//     },
//   },
// ];

const columns = ({ navigate }) => [
  {
    headerName: "Année Universitaire",
    field: "anneeUniversitaire",
    type: "string",
    width: 150,
    valueGetter: (params) => `${params.row.anneeUniversitaire || ""}`,
  },
  {
    headerName: "Enseignant",
    field: "enseignantByNoEnseignant",
    type: "string",
    width: 300,
    valueGetter: (params) =>
      `${params.row.enseignantByNoEnseignant.nom || ""}` +
      ` ${params.row.enseignantByNoEnseignant.prenom}`,
  },

  {
    field: "nbMaxEtudiant",
    headerName: "Nombre max des étudiants",
    type: "string",
    width: 200,
  },
  {
    field: "dateReponseLp",
    headerName: "Date réponse LP",
    type: "string",
    width: 200,
  },
  {
    field: "dateReponseLalp",
    headerName: "Date réponse LalP",
    type: "string",
    width: 200,
  },
  {
    field: "dateRentree",
    headerName: "Date de rentrée",
    type: "string",
    width: 200,
  },
  {
    field: "lieuRentree",
    headerName: "Lieu de rentrée",
    type: "string",
    width: 200,
  },
  {
    field: "processusStage",
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
              `/promotions/${params.row.codeFormation}/${params.row.anneeUniversitaire}`
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
  const [promo, setPromo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

 /*
   useEffect(() => {
     
     
    setLoading(true);
   axios
      .get(`http://localhost:8034/promotion/`)
      .then((res) => {
        console.log("res :>> ", res);
        if (res.data == undefined) {
          navigate("*", { replace: true });
        } else {
          console.log(res.data);
          setLoading(false);
          setPromo(res.data);
        }
      })
      .catch((err) => {
        if (!err.response) navigate("/erreur.jsp");
        else if (err.response.status === 404) navigate("*", { replace: true });

      });   
  }, []); 
  
*/
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
  if (loading) return <Loader />;
  if (error) return <Error />;
  return (
    <div style={{ height: 400, width: "95%", margin: "50px" }}>
      <Grid container spacing={2} columns={20}>
        <Grid item xs={17}>
          <h3 className="h1">Promotions DOSI</h3>
        </Grid>
        <Grid item xs={3}>
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
            title={
              <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
                Formulaire d'ajout étudiant
              </h3>
            }
            visible={isModalVisible}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            // onOk={handleOk}
            onCancel={handleCancel}
          >
            <CreatePromoPopUp />;
          </Modal>
          <DataGrid
            // getRowId={(id) => get(id, "codeFormation", cuid())}
            getRowId={(promo) => promo.anneeUniversitaire + promo.codeFormation}
            rows={promo}
            columns={columns({ navigate })}
            hideFooter="true"
            // pageSize={10}
            // rowsPerPageOptions=""
            // options={{
            //   paging: false,
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
