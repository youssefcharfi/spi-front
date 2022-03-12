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
                    Server did not respond, Please try again later
                </Typography>
            </Grid>

        </Grid>

    )
}

export default ServerError