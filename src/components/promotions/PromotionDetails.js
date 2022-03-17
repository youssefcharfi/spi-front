import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import Promotion from "./Promotion";
import Candidats from "../candidats/Candidats";
import axios from "axios";
import Etudiants from "../etudiants/Etudiants";
import { Container } from "@mui/material";
import Loader from "../shared/Loader";
import ServerError from "../ServerError";
import Error from "../shared/Error";

function PromotionDetails() {


  const [promotion, setPromotion] = useState({});
  const [universite, setUniversite] = useState(new Map());
  const [errorServer, setErrorServer] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8034/promotions/${codeFormation}/${anneeUniversitaire}`
      )
      .then((res) => {
        setPromotion(res.data);
        setLoading(false);
        setErrorServer(false)
        setNotFound(false)
      })
      .catch((err) => {
        setLoading(false)
        if (!err.response || err.response.status === 500) {
          setNotFound(false)
          setErrorServer(true)
        }
        else if (err.response.status === 404) setNotFound(true);
      });
    //////////////////////////////////
    axios.get(`http://localhost:8034/domaine/universite`).then((res) => {
      res.data.map((univ) =>
        setUniversite(universite.set(univ.abreviation, univ.signification))
      );
    });
    ///////////////////////////////////////
  }, []);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { codeFormation, anneeUniversitaire } = useParams();


  if (loading) return <Loader />
  if(errorServer) return <ServerError/>
  if(notFound) return <Error message={`Promotion ${codeFormation} ${anneeUniversitaire} n'éxiste pas`}/>

  return (
    <>
      <Container maxWidth style={{ height: 450}}>
        <div id="card2" className="p-1 mt-1 text-center mb-3 card">
          <div className="card-body">
            <h5
              className="card-title"
              style={{ color: "black", textDecoration: "none" }}
            >
              {" "}
              <i
                style={{ color: "#0EA0E8" }}
                className="fas fa-book-reader mx-1"
              ></i>{" "}
              Promotion : {codeFormation} {anneeUniversitaire}
            </h5>
          </div>
        </div>

        <Box
          sx={{
            bgcolor: "background.paper"
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Candidats" {...a11yProps(1)} />
              <Tab label="Etudiants" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Promotion
                promotion={promotion}
              ></Promotion>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Candidats promotion={promotion} universite={universite} setPromotion={setPromotion}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Etudiants etudiants={promotion.etudiants} />
            </TabPanel>
          </SwipeableViews>
        </Box>

      </Container>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default PromotionDetails;
