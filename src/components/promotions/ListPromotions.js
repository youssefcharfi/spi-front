import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import CreatePromoPopUp from "./CreatePromoPopUp";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { Modal, Tooltip } from "antd";
import axios from "axios";
import "toastr/build/toastr.css";
import toastr from "toastr";
import InfoIcon from '@mui/icons-material/Info';

const columns = ({ navigate }) => [
  {
    headerName: "Année Universitaire",
    field: "anneeUniversitaire",
    type: "string",
    flex: 0.3,
    valueGetter: (params) => `${params.row.anneeUniversitaire || ""}`,
  },
  {
    headerName: "Enseignant",
    field: "enseignantByNoEnseignant",
    type: "string",
    flex: 0.3,
    valueGetter: (params) =>
      `${params.row?.enseignantByNoEnseignant.nom || ""}` +
      ` ${params.row?.enseignantByNoEnseignant.prenom}`,
  },

  {
    field: "nbMaxEtudiant",
    headerName: "Max des étudiants",
    type: "string",
    flex:0.3,
  },
  {
    field: "dateReponseLp",
    headerName: "Date réponse LP",
    type: "string",
    flex: 0.3,
  },
  {
    field: "dateReponseLalp",
    headerName: "Date réponse LalP",
    type: "string",
    flex: 0.3,
  },
  {
    field: "dateRentree",
    headerName: "Date de rentrée",
    type: "string",
    flex: 0.3,
  },
  {
    field: "lieuRentree",
    headerName: "Lieu de rentrée",
    type: "string",
    flex: 0.3,
  },
  {
    field: "processusStage",
    headerName: "Processus Stage",
    type: "string",
    flex: 0.3,
    valueGetter: (params) =>
      params.row.processusStage != null ?  params.row.processusStage : "Pas de processus stage"
  },

  {
    headerName: "details",
    field: "detail",
    flex: 0.20,
    renderCell: (params) => {
      return (
        <IconButton
          onClick={() =>
            navigate(
              `/promotions/${params.row.codeFormation}/${params.row.anneeUniversitaire}`
            )
          }
        >
          <InfoIcon fontSize="small"  color="primary"/> 
        </IconButton>
      );
    },
  },
];

const Promotion = () => {
  const [promo, setPromo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { codeFormation } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8034/promotions/${codeFormation}`)
      .then((res) => {
        setLoading(false);
        console.log("res :>> ", res);
        if (res.data == undefined) {
          navigate("*", { replace: true });
        } else {
          console.log(res.data);
          setLoading(false);
          setPromo(res.data);
        }
      }, [])
      .catch((err) => {
        setLoading(false);
        if (!err.response) navigate("/erreur.jsp");
        else if (err.response.status === 404) setError(true);
      });
  }, []);

  const ajoutPromo = (promotion) => {
    setPromo([promotion, ...promo]);
    toastr.info("Promotion à été ajouter avec succeés");
  };

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  const [form, setForm] = useState({});

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleReset = () => {
    form.resetFields();
  };
  if (loading) return <Loader />;
  if (error)
    return (
      <Error
        message={
          "Aucune promotion n'est disponible pour la formation " + codeFormation
        }
      />
    );
  return (
    <Container style={{ height: 319}} maxWidth>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mb: 4}}>
        <Grid item>
          <h4 className="h2">Promotion : {codeFormation}</h4>
        </Grid>
        <Grid item>
        <Tooltip title="Ajouter" placement="bottom">
          <IconButton aria-label="add">
            <AddBoxIcon fontSize="large" color="primary" onClick={showModal} />
          </IconButton>
        </Tooltip>
          {/* <AddBoxIcon fontSize="large" color="primary" onClick={showModal} style={{cursor:"pointer",float:"right"}}/> */}

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
                Formulaire d'ajout Promotion
              </h3>
            }
            visible={isModalVisible}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            // onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
          >
            <CreatePromoPopUp
              codeFormation={codeFormation}
              ajoutPromo={ajoutPromo}
              formulaire={setForm}
              resetForm={handleReset}
            />
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
    </Container>
  );
};

export default Promotion;
