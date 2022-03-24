import { React, useState, useEffect } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import CreatePromoPopUp from "./CreatePromoPopUp";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { Modal, Row, Col } from "antd";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import Tooltip from "@mui/material/Tooltip";
import "toastr/build/toastr.css";
import toastr from "toastr";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from '@mui/icons-material/DeleteForever';
import ServerError from "../ServerError";
import Typography from "@mui/material/Typography";
//import dateFormat from "dateformat";

toastr.options = {
  "closeButton": true,
  "positionClass": "toast-top-center",
  "timeOut": 0,
  "extendedTimeOut": 0
};

const Promotion = () => {

  const confirm = useConfirm();
  const [promo, setPromo] = useState([]);
  const [error, setError] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(false);
  const { codeFormation } = useParams();
  const [salles, setSalles] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8034/promotions/${codeFormation}`)
      .then((res) => {
        setLoading(false);
        setErrorServer(false);
        setError(false);
        setPromo(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (!err.response || err.response.status === 500) setErrorServer(true);
        else if (err.response.status === 404) setError(true);
      });

    axios.get(`http://localhost:8034/domaine/salle`).then((res) => {
      setSalles(res.data);
    });
  }, []);


  
let stage = new Map([
  ['EC', 'Stage en cours'],
  ['EVAL', 'Stage evalué'],
  ['RECH', 'Recherche en cours'],
  ['SOUT', 'Sessions de soutenance définies'],
  ['TUT', 'Tuteurs attribués']
])

const columns = ({ navigate }) => [
  {
    headerName: "Année universitaire",
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
      `${params.row?.enseignantByNoEnseignant?.prenom || ""}` +
      ` ${params.row?.enseignantByNoEnseignant?.nom || ""}`,
  },

  {
    field: "nbMaxEtudiant",
    headerName: "Nombre max des étudiants",
    type: "string",
    flex: 0.4,
  },
  {
    field: "dateReponseLp",
    headerName: "Date de réponse LP",
    type: "string",
    flex: 0.3,
    // renderCell: (params) => {
    //   return dateFormat(params.row.dateReponseLp, "dd/mm/yyyy");
    // },
  },
  {
    field: "dateReponseLalp",
    headerName: "Date de réponse LalP",
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
    headerName: "Processus de stage",
    type: "string",
    flex: 0.3,
    valueGetter: (params) =>
      params.row.processusStage != null
        ? stage.get(params.row.processusStage)
        : "Pas de processus de stage",
  },

  {
    headerName: "Détails",
    field: "detail",
    flex: 0.1,
    align: "center",
    renderCell: (params) => {
      return (
        <IconButton
          onClick={() =>
            navigate(
              `/promotions/${params.row.codeFormation}/${params.row.anneeUniversitaire}`
            )
          }
        >
          <InfoIcon fontSize="small" color="primary" />
        </IconButton>
      );
    },
  },
  {
    field: "supprimer",
    headerName: "",
    flex: 0.1,
    renderCell: (params) => {
      return (
        <Tooltip title={"Supprimer la promotion " + params.row.codeFormation + " " + params.row.anneeUniversitaire} placement="bottom">
          <IconButton
            onClick={() => deletePromo(params.row)}
          >
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        </Tooltip>

      );
    },
  },
];

const deletePromo = (promoToDelete) => {
  confirm({
    cancellationText: "Non",
    confirmationText: "Oui",
    title: "Supprimer une promotion",
    description: `Êtes vous sûrs de supprimer la promotion ${promoToDelete.codeFormation} ${promoToDelete.anneeUniversitaire} ?`,
  })
    .then(() => {
      axios.delete(`http://localhost:8034/promotions/${promoToDelete.codeFormation}/${promoToDelete.anneeUniversitaire}`)
        .then(() =>{
          setPromo(promo.filter(p => p.codeFormation !== promoToDelete.codeFormation && p.anneeUniversitaire !== promoToDelete.anneeUniversitaire))
           toastr.info("La promotion " + promoToDelete.codeFormation + " " + promoToDelete.anneeUniversitaire + " est supprimée avec succés", "Suppréssion d'une promotion")
          })
        .catch(err => {
          if (err.response.status === 409) toastr.error(err.response.data.errorMeassage, "Suppréssion d'une promotion")
        })
    })
    .catch(err => console.log(err))

}


  const ajoutPromo = (promotion) => {
    setPromo([promotion, ...promo]);
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
  // if (error) return  <Error message={"Aucune promotion n'est disponible pour la formation " + codeFormation}/>
  if (errorServer) return <ServerError />;
  return (
    <Container style={{ height: 319 }} maxWidth>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
      >
        <Grid item>
          <h4 className="h2">Promotions de la formation : {codeFormation}</h4>
        </Grid>
        <Grid item>
          <Tooltip title="Ajouter" placement="bottom">
            <IconButton aria-label="add">
              <AddBoxIcon
                fontSize="large"
                color="primary"
                onClick={showModal}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Modal
                title={
                  <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
                    Ajouter une promotion
                  </h3>
                }
                visible={isModalVisible}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={handleCancel}
                width={800}
              >
                <CreatePromoPopUp
                  codeFormation={codeFormation}
                  ajoutPromo={ajoutPromo}
                  formulaire={setForm}
                  resetForm={handleReset}
                  salles={salles}
                />
              </Modal>
            </Col>
          </Row>
          {error ? (
            <Error
              message={
                "Aucune promotion n'est disponible pour la formation " +
                codeFormation
              }
            />
          ) : promo.length > 0 ? (
            <DataGrid
              getRowId={(promo) =>
                promo.anneeUniversitaire + promo.codeFormation
              }
              rows={promo}
              columns={columns({ navigate })}
              hideFooter="true"
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              initialState={{
                sorting: {
                  sortModel: [
                    {
                      field: "dateRentree",
                      sort: "asc",
                    },
                  ],
                },
              }}
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
                  Il n'y a pas de promotion à afficher pour cette formation
                </Typography>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Promotion;
