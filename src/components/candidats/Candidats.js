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
function Candidats({ promotion, universite }) {
  console.log(promotion.candidats);
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

    { field: "listeSelection", headerName: "listeSelection", width: 200 },
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

      renderCell: (params) => {
        return params.row.confirmationCandidat == "O" ? (
          <CheckBoxIcon
            style={{ justifyContent: "center" }}
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

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container spacing={2} columns={20}>
        <Grid item xs={17}></Grid>
        <Grid item xs={3}>
          <IconButton aria-label="add">
            <AddBoxIcon
              fontSize="large"
              color="primary"
              onClick={showModal}
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
