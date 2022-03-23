import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Modal } from "antd";
import AddCandidat from "./AddCandidat";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import toastr from "toastr";
import { useConfirm } from "material-ui-confirm";

function Candidats({ promotion, universite, setPromotion, pays, setLp, setLa, setNbEtudiant }) {
  let keys = Array.from(universite.keys());
  var listeDeSelection = new Map();
  listeDeSelection.set("LP", "Liste Principale");
  listeDeSelection.set("LA", "Liste d'Attente");
  listeDeSelection.set("NR", "Non Retenu");

  //promotion.candidats = [];

  const confirm = useConfirm();

  const [candidats, setCandidats] = useState(promotion.candidats);
  const [candidatsSearch, setCandidatsSearch] = useState(promotion.candidats);

  const ajouterCandidat = (candidat) => {
    if(candidat.listeSelection === "LP") setLp(candidatsSearch?.filter(cand => cand.listeSelection === "LP").length + 1)
    if(candidat.listeSelection === "LA") setLa(candidatsSearch?.filter(cand => cand.listeSelection === "LA").length + 1)
    setCandidats([candidat, ...candidats]);
    setCandidatsSearch([candidat, ...candidatsSearch])
  };

  const columns = [
    { field: "prenom", headerName: "Prénom", flex: 0.3 },
    { field: "nom", headerName: "Nom", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },

    {
      headerName: "Université d'origine",
      field: "universiteOrigine",
      flex: 0.3,
      //align: "center",
      renderCell: (params) => {
        return (
          <Tooltip
            title={universite.get(params.row.universiteOrigine)}
            placement="bottom-start"
            followCursor
          >
            <div>{params.row.universiteOrigine}</div>
          </Tooltip>
        );
      },
    },
    {
      headerName: "Liste de sélection",
      field: "listeSelection",
      flex: 0.3,
      //align: "center",
      renderCell: (params) => {
        return <div>{listeDeSelection.get(params.row.listeSelection)}</div>;
      },
    },
    {
      field: "selectionNoOrdre",
      headerName: "Ordre de sélection",
      align: "center",
      flex: 0.3,
    },

    {
      headerName: "Confirmation",
      field: "detail",
      flex: 0.2,
      align: "center",
      renderCell: (params) => {
        return params.row.confirmationCandidat == "O" ? (
          <Tooltip
            title={"Candidature acceptée"}
            placement="bottom-start"
            followCursor
          >
            <CheckBoxIcon
              style={{ alignItems: "center", justifyContent: "center" }}
              fontSize="large"
              color="success"
            />
          </Tooltip>
        ) : params.row.confirmationCandidat == "N" ? (
          <Tooltip
            title={"Candidature refusée"}
            placement="bottom-start"
            followCursor
          >
            <IndeterminateCheckBoxIcon
              style={{ alignItems: "center", justifyContent: "center" }}
              fontSize="large"
              color="error"
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={"En attente de confirmation"}
            placement="bottom-start"
            followCursor
          >
            <HelpCenterIcon fontSize="large" color="danger" />
          </Tooltip>
        );
      },
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const enEtudiant = () => {
    if (candidats.length > 0) {
      confirm({
        cancellationText: "Non",
        confirmationText: "Oui",
        title: "Admision Candidats",
        description: `Est ce que vous voulez accepter les candidats de cette promotion ?`,
      })
        .then(() => {
          axios
            .post(
              `http://localhost:8034/promotions/${promotion.codeFormation}/${promotion.anneeUniversitaire}/accept`
            )
            .then((res) => {
              axios
                .get(
                  `http://localhost:8034/promotions/${res.data.codeFormation}/${res.data.anneeUniversitaire}`
                )
                .then((res) => {
                  console.log(res);
                  setPromotion(res.data);
                  setLp(res.data?.candidats?.filter(cand => cand.listeSelection === "LP").length)
                  setLa(res.data?.candidats?.filter(cand => cand.listeSelection === "LA").length)
                  setNbEtudiant(res.data?.etudiants.length)
                  setCandidats(res.data.candidats);
                })
                .catch((error) => {
                  toastr.error(
                    error.response.data.errorMeassage,
                    "Admission des candidats"
                  );
                });
              toastr.info(
                "Vous avez bien acceptez les candidats de cette promotion",
                "Admission Candidat"
              );
            })
            .catch((error) => {
              toastr.error(
                error.response.data.errorMeassage,
                "Admission Candidats"
              );
            });
        })
        .catch(() => console.log("Deletion cancelled."));
    } else {
      toastr.info("Pas de candidats pour l'admission!", "Admission Candidats");
    }
  };

  const handleChange = (e) => {
    let search = e.target.value;
    if (search.split(" ").join("") !== "") {
      setCandidats(
        candidatsSearch.filter(
          (candidat) =>
            candidat.nom.toLowerCase().includes(search.toLowerCase()) ||
            candidat.prenom.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else setCandidats(candidatsSearch);
  };

  const options = {
    textLabels: {
      pagination: {
        next: "Suivant >",
        previous: "< Precedent",
        //rowsPerPage: "Total items Per Page",
        displayRows: "/",
      },
    },
  };

  return (
    <Container style={{ height: 426.5 }} maxWidth>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item>
          <Tooltip title="Admission des candidats" placement="bottom">
            <IconButton aria-label="add">
              <ArrowCircleRightIcon
                fontSize="large"
                color="primary"
                onClick={enEtudiant}
                // onClick={() => navigate("/candidats/create")}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "right" }}
          >
            <Grid item>
              <TextField
                margin=""
                size="small"
                id="outlined-basic"
                label="Chercher par Nom ou Prénom"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                sx={{
                  "& > :not(style)": { width: "28ch" },
                }}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Ajouter un candidat" placement="bottom">
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
        </Grid>
      </Grid>
      <Modal
        title={
          <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
            Ajouter un candidat
          </h3>
        }
        visible={isModalVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <AddCandidat
          codeFormation={promotion.codeFormation}
          anneeUniversitaire={promotion.anneeUniversitaire}
          ajouterCandidat={ajouterCandidat}
          fermerPopUp={handleCancel}
          universite={universite}
          pays={pays}
        />
      </Modal>

      {candidats.length > 0 ? (
        <DataGrid
          rows={candidats}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.noCandidat}
          style={{ height: "87%", marginTop: "10px" }}
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
          checkboxSelection
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
            il n'y a pas de candidats à afficher pour cette promotion
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Candidats;
