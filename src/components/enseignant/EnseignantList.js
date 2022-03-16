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
import SearchBar from "../shared/SearchBar";
export default function EnseignantList({recupererEnseignant}) {
  const [enseignants, setEnseignants] = useState([])
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchedVal) => {
  const filteredItems = enseignants.filter((item) => {
      let fullName = item.nom+ " "+item.prenom;
      return fullName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setItems(filteredItems);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  useEffect(() => {
      axios.get(`http://localhost:8034/enseignants`)
          .then(res => {
            setEnseignants(res.data)
            setItems(res.data)
          })
          .catch(err => {
              if(!err.response) navigate("/erreur.jsp")
              else if(err.response.status === 404) navigate("*", { replace: true })
          })
  }, [])

  let listItem = (enseignant, index) => {
    return (
      <div key={index}>
        <ListItem  alignItems="flex-start" style={{cursor:'pointer'}} className="my-3" onClick={() => {
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
    <div>
      <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          placeholder="filter"
          className="mb-2"
        />
    <List sx={{ width: '100%', bgcolor: 'background.paper' , maxHeight:'500px' , overflowY:"scroll" }}>
      {
        items.map((enseignant,i) => listItem(enseignant,i))
      }
    </List>
    </div>
  );
}