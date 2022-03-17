import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Modal } from "antd";
import AddCandidat from "./AddCandidat";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import toastr from "toastr";
import { useConfirm } from "material-ui-confirm";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Candidats({ promotion, universite, setPromotion, pays }) {
  console.log("universite  ", universite.values);
  let keys = Array.from(universite.keys());
  console.log("keys: ", keys);
  var listeDeSelection = new Map();
  listeDeSelection.set("LP", "Liste Principale");
  listeDeSelection.set("LA", "Liste d'Attente");
  listeDeSelection.set("NR", "Non Retenu");

  //promotion.candidats = [];

  const confirm = useConfirm();
  const [candidats, setCandidats] = useState(promotion.candidats);
  const [candidatsSearch, setCandidatsSearch] = useState(promotion.candidats);

  console.log(promotion.candidats);

  const ajouterCandidat = (candidat) => {
    setCandidats([candidat, ...candidats]);
  };

  const columns = [
    { field: "prenom", headerName: "Prenom", flex: 0.3 },
    { field: "nom", headerName: "Nom", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },

    {
      headerName: "Universite d'origine",
      field: "universiteOrigine",
      flex: 0.3,
      align: "center",
      renderCell: (params) => {
        //console.log("params:   ", universite.get(params.row.universiteOrigine));
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

    // { field: "listeSelection", headerName: "listeSelection", width: 150 },
    {
      headerName: "Liste de selection",
      field: "listeSelection",
      flex: 0.3,
      align: "center",
      renderCell: (params) => {
        // console.log("params:   ",listeDeSelection.get(params.row.listeSelection));
        return (
          <Tooltip
            title={listeDeSelection.get(params.row.listeSelection)}
            placement="bottom-start"
            followCursor
          >
            <div>{params.row.listeSelection}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "selectionNoOrdre",
      headerName: "Ordre de selection",
      align: "center",
      flex: 0.3,
    },

    {
      headerName: "confirmation",
      field: "detail",
      flex: 0.2,
      align: "center",
      renderCell: (params) => {
        return params.row.confirmationCandidat == "O" ? (
          <Tooltip title={"confirmé"} placement="bottom-start" followCursor>
            <CheckBoxIcon
              style={{ alignItems: "center", justifyContent: "center" }}
              fontSize="large"
              color="success"
            />
          </Tooltip>
        ) : params.row.confirmationCandidat == "N" ? (
          <Tooltip title={"non confirmé"} placement="bottom-start" followCursor>
            <IndeterminateCheckBoxIcon
              style={{ alignItems: "center", justifyContent: "center" }}
              fontSize="large"
              color="error"
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={"en attente de canfirmation"}
            placement="bottom-start"
            followCursor
          >
            <CheckBoxOutlineBlankIcon fontSize="large" color="danger" />
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
                  setCandidats(res.data.candidats);
                })
                .catch((error) => {
                  toastr.error(
                    error.response.data.errorMeassage,
                    "Admission Candidats"
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
    /*axios
    .get(`http://localhost:8034/promotions/${promotion.codeFormation}/${promotion.anneeUniversitaire}`)
    .then((res) => {
      console.log("Candidat ");
      console.log(res);
      setCandidats(res.data.candidats);
    })
    .catch((error) => {
      toastr.error(error.response.data.errorMeassage,"Erreur d'ajout");
    });*/
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
                label="Chercher par Nom/Prénom"
                variant="outlined"
                onChange={(e) => handleChange(e)}
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
            Ajouter un Candidat
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
              il n y a pas de candidat à afficher pour cette promotion
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Candidats;
