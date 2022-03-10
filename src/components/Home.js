import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3.25),
    textAlign: 'center',
    fontSize:"20px",
    height : "80px",
    cursor:"pointer"
}));

function Home() {
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={6}>
                    <Link to="/promotions"><Item sx={{ boxShadow: 3 }}><i style={{ color: "#0EA0E8" }} className="fa-solid fa-graduation-cap mx-1"></i>  Promotions</Item></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/formations"><Item sx={{ boxShadow: 3 }}><i style={{ color: "#0EA0E8" }} className="fa fa-calendar mx-1"></i>  Formations</Item></Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    )
}

export default Home