import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

function PageNotFound() {
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"     
    >
      <Grid item>
        <img  src="image-asset.jpeg" style={{width:"80%"}} ></img>
      </Grid>
      <Grid item >
        <Typography color="#1d1d1d" fontSize="51px" textAlign="center">
          404 Page Introuvable
        </Typography>
        <Typography color="#1d1d1d" fontSize="20px" textAlign="center" style={{opacity:0.7}}>
        C'est juste une erreur 404 !
        <br></br>
        Ce que vous cherchez n'est pas reconnu. Merci de revenir à la page d'accueil.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;
