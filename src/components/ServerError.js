import React from 'react'
import { Grid } from '@mui/material'
import Typography from "@mui/material/Typography"

function ServerError() {
    return (
        <Grid
      container
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"     
    >
      <Grid item>
        <img  src="angry-error.png" style={{width:"90%"}} ></img>
      </Grid>
      <Grid item >
        <Typography color="error" fontSize="40px" textAlign="center">
        500 Erreur de serveur
        </Typography>
        <Typography color="#1d1d1d" fontSize="25px" textAlign="center" >
        Désolé, on est un peu perdu
        </Typography>
        <Typography color="#1d1d1d" fontSize="15px" textAlign="center" style={{opacity:0.7}}>
        le serveur a rencontré une erreur temporaire et n'a pas pu traiter votre demande.
        <br></br>
        Veuillez réessayer plus tard.
        </Typography>
      </Grid>
    </Grid>
    )
}

export default ServerError