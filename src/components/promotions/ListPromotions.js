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
import Stack from "@mui/material/Stack";

import { Popover } from "antd";
import { Modal } from "antd";
import axios from "axios";

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

const Promotion = ({ codeFormation }) => {
  const [promo, setPromo] = useState([]);
<<<<<<< HEAD
  codeFormation = "M2DOSI";

=======
 // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
>>>>>>> df14acf (gestion error affichage)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8034/promotion/` + codeFormation)
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
<<<<<<< HEAD
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    // .catch((err) => console.log(err));

    //
=======
      .catch((err) => {
      /*  setLoading(false);
        setError(true);
        */
      });
>>>>>>> df14acf (gestion error affichage)
  }, []);
 
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
 // if (error) return <Error message={"Une Erreur est survenue"} />;
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
<<<<<<< HEAD
                Formulaire d'ajout étudiant
              </h3>
            }
=======
                Formulaire d'ajout promotion
              </h3>
            }
            width={800}
>>>>>>> df14acf (gestion error affichage)
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
<<<<<<< HEAD
            hideFooter="true"
            // pageSize={10}
            // rowsPerPageOptions=""
            // options={{
            //   paging: false,
            // }}
=======
            pageSize={10}
            rowsPerPageOptions={[5]}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Aucune promotion trouvée
                </Stack>
              ),
            }}
>>>>>>> df14acf (gestion error affichage)
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
