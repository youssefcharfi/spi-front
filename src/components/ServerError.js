import React from 'react'
import { Grid } from '@mui/material'
import Typography from "@mui/material/Typography"

function ServerError() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >

            <Grid item xs={3}>
                <Typography color="red" fontSize="30px">
                    Erreur du serveur, Veuillez réessayer plus tard
                </Typography>
            </Grid>

        </Grid>

    )
}

export default ServerError