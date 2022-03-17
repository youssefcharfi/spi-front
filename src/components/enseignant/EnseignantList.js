import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from "@mui/material";


export default function EnseignantList({ recupererEnseignant }) {


  const [enseignants, setEnseignants] = useState([])
  const [enseignantsSearch, setEnseignantsSearch] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8034/enseignants`)
      .then(res => {
        setEnseignants(res.data)
        setEnseignantsSearch(res.data)
      })
      .catch(err => {
        if (!err.response) navigate("/erreur.jsp")
        else if (err.response.status === 404) navigate("*", { replace: true })
      })
  }, [])

  const handleChange = (e) => {
    let search = e.target.value
    if (search.split(' ').join('') !== "") {
      setEnseignants(enseignantsSearch.filter(ens => {
        let fullName =  ens.nom.toLowerCase() + " " + ens.prenom.toLowerCase()
        return fullName.includes(search.toLowerCase())
      }))
    }
    else setEnseignants(enseignantsSearch)
  }

  let listItem = (enseignant, index) => {
    let avatar;
    if(enseignant.sexe == "F"){
      avatar = "https://randomuser.me/portraits/women/86.jpg"
    }
    else {
      avatar = "https://randomuser.me/portraits/men/86.jpg"
    }
    return (
      <div key={index}>
        <ListItem alignItems="flex-start" style={{ cursor: 'pointer' }} className="my-3" onClick={() => {
          recupererEnseignant(enseignant);
        }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={enseignant.nom + ' ' + enseignant.prenom}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {enseignant.nom} {enseignant.prenom}
                </Typography>
                {" — Enseignant"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  };
  return (
    <Grid item>

      <TextField style={{ width: "460px", marginBottom: "15px" }} id="outlined-basic" label="Chercher enseignant" variant="outlined" onChange={(e) => handleChange(e)} />

      <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '500px', overflowY: "scroll" }}>
        {
          enseignants.map((enseignant, i) => listItem(enseignant, i))
        }
      </List>
    </Grid>
  );
}