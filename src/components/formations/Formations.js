import { React, useState, useEffect } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Button, Container, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Loader from "../shared/Loader";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ServerError from "../ServerError";

function Formations() {
  const [formations, setFormations] = useState([]);

  const [formationsSearched, setFormationsSearched] = useState([]);

  const [errorServer, setErrorServer] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFormations();
  }, []);

  let navigate = useNavigate();

  const getFormations = () => {
    axios
      .get("http://localhost:8034/formations")
      .then((res) => {
        setFormations(res.data);
        setFormationsSearched(res.data);
        setLoading(false);
        setErrorServer(false);
      })
      .catch((err) => {
        setLoading(false);
        if (!err.response || err.response.status === 500) {
          setErrorServer(true);
        } else if (err.response.status === 404)
          navigate("*", { replace: true });
      });
  };

  const handleChange = (e) => {
    let search = e.target.value;
    if (search.split(" ").join("") !== "") {
      setFormations(
        formationsSearched.filter(
          (formation) =>
            formation.codeFormation
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            formation.nomFormation.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else setFormations(formationsSearched);
  };

  const columns = [
    {
      field: "codeFormation",
      headerName: "Code",
      type: "string",
      flex: 0.2,
      align: "left",
    },
    {
      field: "diplome",
      headerName: "Diplome",
      type: "string",
      flex: 0.2,
      valueGetter: (params) =>
        `${params.row.diplome || ""}` + `${params.row.n0Annee}`,
    },

    {
      field: "nomFormation",
      headerName: "Nom formation",
      type: "string",
      flex: 0.9,
    },
    {
      field: "doubleDiplome",
      headerName: "Double diplome",
      type: "string",
      flex: 0.25,
      align: "center",
    },
    {
      field: "debutAccreditation",
      headerName: "Début Accreditation",
      type: "string",
      flex: 0.3,
    },
    {
      field: "finAccreditation",
      headerName: "Fin Accreditation",
      type: "string",
      flex: 0.3,
    },
    {
      headerName: "Promotion",
      field: "jnjn",
      flex: 0.2,
      align: "center",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.codeFormation} placement="right">
            <IconButton
              onClick={() =>
                navigate(`/promotions/${params.row.codeFormation}`)
              }
            >
              <FormatListBulletedIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  if (loading) return <Loader />;
  if (errorServer) return <ServerError />;
  return (
    <Container style={{ height: 319 }} maxWidth>
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item>
          <h4 className="h2">Formations</h4>
        </Grid>
        <Grid item>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "27ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              size="small"
              label="Chercher par Code ou Nom"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </Grid>
      </Grid>

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={formations}
            columns={columns}
            pageSize={formations.length}
            rowsPerPageOptions={[formations.length]}
            getRowId={(row) => row.codeFormation}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              sorting: {
                sortModel: [
                  {
                    field: "nomFormation",
                    sort: "asc",
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
}

export default Formations;
