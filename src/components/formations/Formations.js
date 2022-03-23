import { React, useState, useEffect } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Loader from "../shared/Loader";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ServerError from "../ServerError";
import Typography from "@mui/material/Typography";
import Error from "../shared/Error";

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
      headerName: "Diplôme",
      type: "string",
      flex: 0.2,
      valueGetter: (params) =>
        `${params.row.diplome || ""}` + `${params.row.n0Annee}`,
    },

    {
      field: "nomFormation",
      headerName: "Nom de la formation",
      type: "string",
      flex: 0.9,
    },
    {
      field: "doubleDiplome",
      headerName: "Double diplôme",
      type: "string",
      flex: 0.25,
      valueGetter: (params) => {
        return params.row.doubleDiplome === "O" ? "Oui" : "Non";
      },
    },

    {
      field: "debutAccreditation",
      headerName: "Début d'accreditation",
      type: "date",
      flex: 0.3,
    },
    {
      field: "finAccreditation",
      headerName: "Fin d'accreditation",
      type: "string",
      flex: 0.3,
    },
    {
      headerName: "Promotions",
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
          {formations.length > 0 ? (
            <DataGrid
              rows={formations}
              columns={columns}
              pageSize={4}
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
          ) : (
            <Error message={"Il n'y a aucune formation à afficher!"} />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Formations;
