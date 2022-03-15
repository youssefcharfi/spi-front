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


export default function EnseignantList({recupererEnseignant}) {
  const [enseignants, setEnseignants] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
      axios.get(`http://localhost:8034/enseignants`)
          .then(res => {
            setEnseignants(res.data)
          })
          .catch(err => {
              if(!err.response) navigate("/erreur.jsp")
              else if(err.response.status === 404) navigate("*", { replace: true })
          })
  }, [])

  let listItem = (enseignant) => {
    return (
      <div>
        <ListItem alignItems="flex-start" style={{cursor:'pointer'}} className="my-3" onClick={() => {
          recupererEnseignant(enseignant);
        } }>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary= {enseignant.nom+' '+enseignant.prenom}
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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        enseignants.map((enseignant) => listItem(enseignant))
      }
    </List>
  );
}