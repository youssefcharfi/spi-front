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
import Button from "@mui/material/Button";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import InfoIcon from "@mui/icons-material/Info";
import { Divider, Modal } from "antd";
import AddCandidat from "./AddCandidat";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import Error from "../shared/Error";
import DndTable from "./DndTable";
import Confirmation from "./Confirmation";

toastr.options = {
  closeButton: true,
  positionClass: "toast-top-center",
  timeOut: 0,
  extendedTimeOut: 0,
};

function Candidats({
  promotion,
  universite,
  setPromotion,
  pays,
  setLp,
  setLa,

  setNbEtudiant,
  setIsChangedCandidat,
}) {
  let keys = Array.from(universite.keys());
  var listeDeSelection = new Map();
  listeDeSelection.set("LP", "Liste principale");
  listeDeSelection.set("LA", "Liste d'attente");
  listeDeSelection.set("NR", "Non retenu");

  //promotion.candidats = [];

  const confirm = useConfirm();

  let navigate = useNavigate();
  /////////////////////////////////////:Confirmation
  const [candidatAConfirmer, setCandidatAConfirmer] = useState({});
  const [open, setOpen] = useState(false);

  // const getCandidatAConfirmer = (candidatConfirmation) => {
  //   setCandidatAConfirmer(candidatConfirmation);

  //   new Promise((resolve, reject) => {
  //     if (candidatAConfirmer != null) resolve("ok");
  //     else reject("candidat null");
  //   });
  // };

  const handleOpenDialog = (candidatConfirmation) => {
    setCandidatAConfirmer(candidatConfirmation);
    setOpen(true);
  };
  ////////////////////////////////////////:

  const [candidats, setCandidats] = useState(promotion.candidats);
  const [candidatsLP, setCandidatsLP] = useState(
    candidats?.filter((cand) => cand.listeSelection === "LP")
  );
  const [candidatsLA, setCandidatsLA] = useState(
    candidats?.filter((cand) => cand.listeSelection === "LA")
  );
  const [candidatsLpUpdated, setCandidatsLpUpdated] = useState([
    ...candidatsLP,
  ]);
  const [candidatsLpUpdatedListeAttente, setCandidatsLpUpdatedListeAttente] =
    useState([...candidatsLA]);

  const [candidatsSearch, setCandidatsSearch] = useState(promotion.candidats);
  const [selectedCandidats, setSelectedCandidats] = useState([]);

  const ajouterCandidat = (candidat) => {
    if (candidat.listeSelection === "LP")
      setLp(
        candidatsSearch?.filter(
          (cand) =>
            cand.listeSelection === "LP" && cand.confirmationCandidat !== "N"
        ).length + 1
      );
    if (candidat.listeSelection === "LA")
      setLa(
        candidatsSearch?.filter(
          (cand) =>
            cand.listeSelection === "LA" && cand.confirmationCandidat !== "N"
        ).length + 1
      );
    setCandidats([candidat, ...candidats]);
    setCandidatsSearch([candidat, ...candidatsSearch]);
  };

  const columns = [
    { field: "nom", headerName: "Nom", flex: 0.3 },
    { field: "prenom", headerName: "Prénom", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },

    {
      headerName: "Université d'origine",
      field: "universiteOrigine",
      flex: 0.3,
      height: 90,
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
      field: "",
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
        ) : params.row.listeSelection == null ||
          params.row.listeSelection == "NR" ? (
          <p> </p>
        ) : (
          <Tooltip
            title={"En attente de confirmation"}
            placement="bottom-start"
            followCursor
          >
            <IconButton onClick={() => handleOpenDialog(params.row)}>
              <HelpCenterIcon fontSize="large" color="danger" />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      headerName: "Détails",
      field: "detail",
      flex: 0.1,
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => navigate(`/candidats/${params.row.noCandidat}`)}
          >
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        );
      },
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalListPrincipale, setIsModalListPrincipale] = useState(false);

  const [isModalListAttente, setIsModalListAttente] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  var selectedNull = false;
  const verifierListeSelection = (liste) => {
    for (var i = 0; i < liste.length; i++) {
      if (liste[i].listeSelection != null) {
        selectedNull = true;
        toastr.error(
          "Merci de ne sélectionner que les candidats qui ne sont pas encore attribués à une liste."
        );
        break;
      }
    }

    // liste.map((l) => {
    //   if (l.listeSelection != null) {
    //     selectedNull = true;
    //     toastr.error(
    //       "Merci de ne sélectionner que les candidats qui ne sont pas encore attribués à une liste."
    //     );
    //   }
    // });
  };

  const showModalListPrincipale = () => {
    var NbrMaxLPReached = false;
    // console.log(candidatsLP);
    // console.log("selected", selectedCandidats);
    verifierListeSelection(selectedCandidats);

    if (
      selectedCandidats.length >
      promotion.nbMaxEtudiant - promotion.etudiants.length - candidatsLP.length
    ) {
      toastr.error(
        "Il n'y a pas assez de place dans la liste principale pour les candidats sélectionés. "
      );
      NbrMaxLPReached = true;
    }

    if (!selectedNull && !NbrMaxLPReached) setIsModalListPrincipale(true);
  };
  ///////
  const showModalListAttente = () => {
    verifierListeSelection(selectedCandidats);
    if (!selectedNull) setIsModalListAttente(true);
  };
  const showModalNonRetenu = () => {
    verifierListeSelection(selectedCandidats);
    console.log("NR");
    console.log("liste candidat nr1: ", selectedCandidats);
    if (!selectedNull)
      //setIsModalListAttente(true);
      confirm({
        cancellationText: "Non",
        confirmationText: "Oui",
        title: "Refuser un candidat",
        description: `Êtes-vous sûr de mettre ces candidats dans la liste des non retenus?`,
      }).then(() => {
        console.log("liste candidat nr2: ", selectedCandidats);
        selectedCandidats.map((c) => {
          c.listeSelection = "NR";
        });
        axios
          .put(`http://localhost:8034/candidats/updateListe`, selectedCandidats)
          .then(() => {
            setIsChangedCandidat(true);
            setIsChangedCandidat(false);
            toastr.info(
              "",
              "Les candidats sélectionnés sont bien ajoutés à la liste des non retenus.",
              {
                closeButton: false,
                timeOut: 4000,
                extendedTimeOut: 100,
              }
            );
          })
          .catch((error) => {
            selectedCandidats.map((c) => {
              c.listeSelection = "";
            });
            toastr.error(error.response.data.errorMeassage);
            console.log(error.response.data.errorMeassage);
          });
      });
  };

  const handleCancelListPrincipale = () => {
    setIsModalListPrincipale(false);
  };

  const handleCancelListAttente = () => {
    setIsModalListAttente(false);
  };

  const enEtudiant = () => {
    if (candidats.length > 0) {
      confirm({
        cancellationText: "Non",
        confirmationText: "Oui",
        title: "Admission des candidats",
        description: `Voulez-vous accepter les candidats de cette promotion ?`,
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
                  setLp(
                    res.data?.candidats?.filter(
                      (cand) => cand.listeSelection === "LP"
                    ).length
                  );
                  setLa(
                    res.data?.candidats?.filter(
                      (cand) => cand.listeSelection === "LA"
                    ).length
                  );
                  setNbEtudiant(res.data?.etudiants.length);
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
                "Admission des candidats"
              );
            });
        })
        .catch(() => console.log("Deletion cancelled."));
    } else {
      toastr.info(
        "Il n'y a pas de candidat pour l'admission!",
        "Admission des candidats"
      );
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

  return (
    <Container style={{ height: 426.5 }} maxWidth>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
              <Tooltip
                title="Ajouter à la liste principale"
                placement="bottom-start"
                followCursor
              >
                <Button
                  variant="outlined"
                  onClick={showModalListPrincipale}
                  style={{
                    borderColor: "Gray",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      style={{ fill: "green" }}
                      d="M17.4999 12.0003C20.5374 12.0003 22.9999 14.4627 22.9999 17.5003C22.9999 20.5378 20.5374 23.0003 17.4999 23.0003C14.4623 23.0003 11.9999 20.5378 11.9999 17.5003C11.9999 14.4627 14.4623 12.0003 17.4999 12.0003ZM14.8534 17.1467C14.6582 16.9514 14.3416 16.9514 14.1463 17.1467C13.9511 17.342 13.9511 17.6586 14.1463 17.8538L16.1463 19.8538C16.3416 20.0491 16.6582 20.0491 16.8534 19.8538L20.8534 15.8538C21.0487 15.6586 21.0487 15.342 20.8534 15.1467C20.6582 14.9514 20.3416 14.9514 20.1463 15.1467L16.4999 18.7931L14.8534 17.1467ZM12.0221 13.9996C11.7254 14.4629 11.4859 14.9663 11.3135 15.4999L4.25229 15.5002C3.8387 15.5002 3.50342 15.8355 3.50342 16.2491V16.8267C3.50342 17.3624 3.69453 17.8805 4.04239 18.2878C5.29569 19.7555 7.26157 20.5013 9.99988 20.5013C10.5963 20.5013 11.1562 20.4659 11.6801 20.3954C11.9253 20.8903 12.2328 21.3489 12.5916 21.7618C11.7961 21.922 10.9312 22.0013 9.99988 22.0013C6.85401 22.0013 4.468 21.0962 2.9017 19.2619C2.32194 18.583 2.00342 17.7195 2.00342 16.8267V16.2491C2.00342 15.007 3.01027 14.0002 4.25229 14.0002L12.0221 13.9996ZM9.99988 2.00488C12.7613 2.00488 14.9999 4.24346 14.9999 7.00488C14.9999 9.76631 12.7613 12.0049 9.99988 12.0049C7.23845 12.0049 4.99988 9.76631 4.99988 7.00488C4.99988 4.24346 7.23845 2.00488 9.99988 2.00488ZM9.99988 3.50488C8.06688 3.50488 6.49988 5.07189 6.49988 7.00488C6.49988 8.93788 8.06688 10.5049 9.99988 10.5049C11.9329 10.5049 13.4999 8.93788 13.4999 7.00488C13.4999 5.07189 11.9329 3.50488 9.99988 3.50488Z"
                      fill="#212121"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip
                title="Ajouter à la liste d'attente"
                placement="bottom-start"
                followCursor
              >
                <Button
                  variant="outlined"
                  onClick={showModalListAttente}
                  style={{
                    color: "red",
                    borderColor: "Gray",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      style={{ fill: "#396bbd" }}
                      d="M11.3135 15.5002C11.4859 14.9667 11.7253 14.4634 12.0219 14.0002H4.25278C3.01076 14.0002 2.00391 15.007 2.00391 16.2491V16.8267C2.00391 17.7195 2.32242 18.583 2.90219 19.2619C4.46849 21.0962 6.8545 22.0013 10.0004 22.0013C10.9314 22.0013 11.7961 21.922 12.5927 21.7629C12.2335 21.3496 11.9256 20.8906 11.6789 20.3957C11.1555 20.466 10.5962 20.5013 10.0004 20.5013C7.26206 20.5013 5.29618 19.7555 4.04287 18.2878C3.69502 17.8805 3.50391 17.3624 3.50391 16.8267V16.2491C3.50391 15.8355 3.83919 15.5002 4.25278 15.5002H11.3135ZM10.0004 2.00488C12.7618 2.00488 15.0004 4.24346 15.0004 7.00488C15.0004 9.76631 12.7618 12.0049 10.0004 12.0049C7.23894 12.0049 5.00036 9.76631 5.00036 7.00488C5.00036 4.24346 7.23894 2.00488 10.0004 2.00488ZM10.0004 3.50488C8.06737 3.50488 6.50036 5.07189 6.50036 7.00488C6.50036 8.93788 8.06737 10.5049 10.0004 10.5049C11.9334 10.5049 13.5004 8.93788 13.5004 7.00488C13.5004 5.07189 11.9334 3.50488 10.0004 3.50488ZM17.5 12.0002C20.5376 12.0002 23 14.4627 23 17.5002C23 20.5378 20.5376 23.0002 17.5 23.0002C14.4624 23.0002 12 20.5378 12 17.5002C12 14.4627 14.4624 12.0002 17.5 12.0002ZM19.5 17.5003H17.5L17.5 15.0002C17.5 14.724 17.2761 14.5002 17 14.5002C16.7239 14.5002 16.5 14.724 16.5 15.0002L16.5 17.9988L16.5 18.0003C16.5 18.2764 16.7239 18.5003 17 18.5003H19.5C19.7761 18.5003 20 18.2764 20 18.0003C20 17.7242 19.7761 17.5003 19.5 17.5003Z"
                      fill="#212121"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip
                title="Refuser la candidature"
                placement="bottom-start"
                followCursor
              >
                <Button
                  variant="outlined"
                  onClick={showModalNonRetenu}
                  style={{
                    color: "red",
                    borderColor: "Gray",
                    textTransform: "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      style={{ fill: "#c4201d" }}
                      d="M17.4999 12.0003C20.5374 12.0003 22.9999 14.4627 22.9999 17.5003C22.9999 20.5378 20.5374 23.0003 17.4999 23.0003C14.4623 23.0003 11.9999 20.5378 11.9999 17.5003C11.9999 14.4627 14.4623 12.0003 17.4999 12.0003ZM12.0221 13.9996C11.7254 14.4629 11.4859 14.9663 11.3135 15.4999L4.25342 15.5002C3.8392 15.5002 3.50342 15.836 3.50342 16.2502V17.1575C3.50342 17.8132 3.78941 18.4362 4.28658 18.8636C5.54467 19.9453 7.44068 20.5013 9.99988 20.5013C10.5987 20.5013 11.1613 20.4709 11.688 20.4104C11.9369 20.9105 12.2507 21.3743 12.617 21.7908C11.8148 21.9315 10.9418 22.0013 9.99988 22.0013C7.11038 22.0013 4.87156 21.3447 3.30869 20.001C2.48007 19.2887 2.00342 18.2503 2.00342 17.1575V16.2502C2.00342 15.0075 3.01078 14.0002 4.25342 14.0002L12.0221 13.9996ZM15.0929 14.9665L15.0237 15.0244L14.9658 15.0936C14.8477 15.2642 14.8477 15.4917 14.9658 15.6623L15.0237 15.7315L16.7932 17.5009L15.0263 19.2677L14.9684 19.337C14.8503 19.5075 14.8503 19.7351 14.9684 19.9056L15.0263 19.9749L15.0955 20.0327C15.266 20.1508 15.4936 20.1508 15.6641 20.0327L15.7334 19.9749L17.5002 18.2079L19.2693 19.9771L19.3385 20.035C19.509 20.1531 19.7366 20.1531 19.9071 20.035L19.9764 19.9771L20.0342 19.9079C20.1524 19.7373 20.1524 19.5097 20.0342 19.3392L19.9764 19.27L18.2072 17.5009L19.9791 15.7316L20.037 15.6623C20.1551 15.4918 20.1551 15.2642 20.037 15.0937L19.9791 15.0244L19.9099 14.9666C19.7394 14.8485 19.5118 14.8485 19.3413 14.9666L19.272 15.0244L17.5002 16.794L15.7308 15.0244L15.6615 14.9665C15.5154 14.8653 15.3273 14.8508 15.1692 14.9231L15.0929 14.9665ZM9.99988 2.00488C12.7613 2.00488 14.9999 4.24346 14.9999 7.00488C14.9999 9.76631 12.7613 12.0049 9.99988 12.0049C7.23845 12.0049 4.99988 9.76631 4.99988 7.00488C4.99988 4.24346 7.23845 2.00488 9.99988 2.00488ZM9.99988 3.50488C8.06688 3.50488 6.49988 5.07189 6.49988 7.00488C6.49988 8.93788 8.06688 10.5049 9.99988 10.5049C11.9329 10.5049 13.4999 8.93788 13.4999 7.00488C13.4999 5.07189 11.9329 3.50488 9.99988 3.50488Z"
                      fill="#212121"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{
                  color: "black",
                  borderColor: "Gray",
                  textTransform: "none",
                }}
                onClick={enEtudiant}
              >
                {/* <ArrowCircleRightIcon
                    fontSize="large"
                    color="primary"
                    onClick={enEtudiant}
                    // onClick={() => navigate("/candidats/create")}
                  /> */}
                Accepter les candidats
              </Button>
            </Grid>
          </Grid>
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
                label="Chercher par nom ou prénom"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                // sx={{
                //   "& > :not(style)": { width: "28ch" },
                // }}
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
          setIsChangedCandidat={setIsChangedCandidat}
        />
      </Modal>

      <Modal
        title={
          <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
            Admission d'un candidats en liste principale
          </h3>
        }
        visible={isModalListPrincipale}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={handleOk}
        onCancel={handleCancelListPrincipale}
        width={1000}
      >
        <DndTable
          candidats={candidatsLpUpdated}
          closeModal={handleCancelListPrincipale}
          setIsChangedCandidat={setIsChangedCandidat}
          listeSelection="LP"
        />
      </Modal>

      <Modal
        title={
          <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
            Admission d'un candidat à la liste d'attente
          </h3>
        }
        visible={isModalListAttente}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={handleOk}
        onCancel={handleCancelListAttente}
        width={1000}
      >
        <DndTable
          candidats={candidatsLpUpdatedListeAttente}
          closeModal={handleCancelListAttente}
          setIsChangedCandidat={setIsChangedCandidat}
          listeSelection="LA"
        />
      </Modal>

      <Confirmation
        open={open}
        setOpen={setOpen}
        candidat={candidatAConfirmer}
        setIsChangedCandidat={setIsChangedCandidat}
      ></Confirmation>

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
                  field: "listeSelection",
                  sort: "desc",
                },
              ],
            },
          }}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            let lengthListprincipale = candidatsLP.length + 1;
            const selectedIDs = new Set(ids);
            const selectedRowData = candidats.filter((row) =>
              selectedIDs.has(row.noCandidat.toString())
            );
            setSelectedCandidats(selectedRowData);
            setCandidatsLpUpdated([...candidatsLP, ...selectedRowData]);
            setCandidatsLpUpdatedListeAttente([
              ...candidatsLA,
              ...selectedRowData,
            ]);
          }}
        />
      ) : (
        <Error
          message={"Aucun candidat n'est disponible pour cette promotion "}
        />
      )}
    </Container>
  );
}

export default Candidats;
