import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
//import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import AddCandidat from "./AddCandidat";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import toastr from "toastr";
import { useConfirm } from "material-ui-confirm";
function Candidats({ promotion, universite , setPromotion}) {
  //promotion.candidats = [];
  // const [universite, setUniversite] = useState(new Map());
  // useEffect(() => {
  //   axios.get(`http://localhost:8034/domaine/universite`).then((res) => {
  //     res.data.map((univ) =>
  //       setUniversite(universite.set(univ.abreviation, univ.signification))
  //     );
  //     console.log("universite :>> ", res.data);
  //     console.log("universite Keyed collections :>> ", universite);
  //   });
  // }, [universite]);
  const confirm = useConfirm();
  const [candidats, setCandidats] = useState(promotion.candidats);

  const ajouterCandidat = (candidat) => {
    setCandidats([candidat, ...candidats]);
    handleCancel();
  };

  const columns = [
    { field: "prenom", headerName: "Prenom", width: 200 },
    { field: "nom", headerName: "Nom", width: 200 },
    { field: "email", headerName: "Email", minWidth: 250 },
    {
      field: "universiteOrigine",
      headerName: "Universite d'origine",
      width: 200,
    },
    {
      headerName: "Universite d'origine",
      field: "universiteOrigine",
      width: 200,

      renderCell: (params) => {
        console.log("params:   ", universite.get(params.row.universiteOrigine));
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

    { field: "listeSelection", headerName: "listeSelection", width: 150 },
    {
      field: "selectionNoOrdre",
      headerName: "selectionNoOrdre",
      // type: "number",
      width: 200,
    },
    {
      headerName: "confirmationCandidat",
      field: "detail",
      width: 200,
      align: "center",
      renderCell: (params) => {
        return params.row.confirmationCandidat == "O" ? (
          <CheckBoxIcon
            style={{ alignItems: "center", justifyContent: "center" }}
            fontSize="large"
            color="success"
          />
        ) : (
          <CheckBoxOutlineBlankIcon fontSize="large" color="success" />
        );
      },
    },
  ];

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


  const enEtudiant = () => {
    if(candidats.length > 0){
      confirm({ cancellationText:"Non",confirmationText:"Oui",title:'Admision Candidats',description: `Est ce que vous voulez accepter les candidats de cette promotion ?` }).then(() =>{
        axios
        .post(`http://localhost:8034/promotions/${promotion.codeFormation}/${promotion.anneeUniversitaire}/accept`)
        .then((res) => {
          axios
            .get(`http://localhost:8034/promotions/${res.data.codeFormation}/${res.data.anneeUniversitaire}`)
            .then((res) => {
              setPromotion(res.data);
              setCandidats(res.data.candidats);
            })
            .catch((error) => {
              toastr.error(error.response.data.errorMeassage, "Admission Candidats");
            })
          toastr.info("Vous avez bien acceptez les candidats de cette promotion","Admission Candidat")
        })
        .catch((error) => {
          toastr.error(error.response.data.errorMeassage, "Admission Candidats");
        });
      }).catch(() => console.log("Deletion cancelled."));
    }else{
      toastr.info("Pas de candidats pour l'admission!","Admission Candidats")
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

  }
  return (
    <div style={{ height: 429, width: "100%" }}>
      <Grid container spacing={2} alignItems="right" justifyContent="right">
        <Grid item>
          <IconButton aria-label="add">
            <AddBoxIcon
              fontSize="large"
              color="primary"
              onClick={showModal}
            // onClick={() => navigate("/candidats/create")}
            />
          </IconButton>
          <IconButton aria-label="add">
            <ArrowCircleRightIcon
              fontSize="large"
              color="primary"
              onClick={enEtudiant}
            // onClick={() => navigate("/candidats/create")}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Modal
        title={
          <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>
            Formulaire d'ajout candidat
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
        />
      </Modal>

      {candidats.length > 0 ? (
        <DataGrid
          rows={candidats}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.noCandidat}
          style={{ height: "87%" }}
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
    </div>
  );
}

export default Candidats;
