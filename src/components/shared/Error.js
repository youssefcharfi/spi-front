import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "350px",
      }}
    >
      <Box sx={{ minWidth: 300 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography variant="h5" component="div">
                {message}
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </div>
  );
};
