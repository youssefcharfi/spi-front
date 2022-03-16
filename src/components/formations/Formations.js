import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import axios from 'axios'
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Loader from "../shared/Loader";

function Formations() {

  const [formations, setFormations] = useState([])

  const [formationsSearched, setFormationsSearched] = useState([])

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    getFormations()
  },[])

  let navigate = useNavigate()

  const getFormations = () => {
    axios.get("http://localhost:8034/formations")
         .then(res => {
           setFormations(res.data)
           setFormationsSearched(res.data)
           setLoading(false);
         })
         .catch((err) => {
          if (!err.response) navigate("/erreur.jsp");
          else if (err.response.status === 404) navigate("*", { replace: true });
  
        });
  } 

  const handleChange = (e) => {

    let search = e.target.value
    if(search.split(' ').join('') !== ""){
      setFormations(formationsSearched.filter(formation => formation.codeFormation.toLowerCase().includes(search.toLowerCase()) || formation.nomFormation.toLowerCase().includes(search.toLowerCase()) ))
    }
    else setFormations(formationsSearched)
  }


  const columns = [
    {
      field: "codeFormation",
      headerName: "Code",
      type: "string",
      width: 100,
    },
    {
      field:"diplome",
      headerName: "Diplome/noAnnée",
      type: "string",
      width: 150,
      valueGetter: (params) =>
        `${params.row.diplome || ""}` +
        `${params.row.n0Annee}`,
    },

    {
      field: "nomFormation",
      headerName: "Nom",
      type: "string",
      width: 450,
    },
    {
      field: "doubleDiplome",
      headerName: "Double diplome",
      type: "string",
      width: 150,
    },
    {
      field: "debutAccreditation",
      headerName: "Début Accreditation",
      type: "string",
      width: 150,
    },
    {
      field: "finAccreditation",
      headerName: "Fin Accreditation",
      type: "string",
      width: 150,
    },
    {
      headerName: "",
      field: "jnjn",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
           onClick={() =>
            navigate(
              `/promotions/${params.row.codeFormation}`
            )
          }
          >
            Promotions
          </Button>
        );
      },
    },
  ];
  if (loading) return <Loader />;
  return (
    <div style={{ height: 400, width: "95%", margin: "50px" }}>
      <Grid container columns={20}>
        <Grid item xs={15}>
          <h4 className="h2">Formations</h4>
        </Grid>
        <Grid item xs={5}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Chercher par Code/Nom" variant="outlined" onChange={(e)=>handleChange(e)}/>
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
          />
        </div>
      </div>
    </div>
  );
}

export default Formations

