import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import toastr from "toastr";
import { Container, Grid } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

toastr.options = {
  closeButton: true,
  positionClass: "toast-top-center",
  timeOut: 0,
  extendedTimeOut: 0,
};

function Confirmation({ open, setOpen, candidat, setIsChangedCandidat }) {
  const confirm = useConfirm();
  //   const [candidatAConfirmer, setCandidatAConfirmer] = React.useState(candidat);

  // const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const reponse = (rep) => {
    confirm({
      cancellationText: "Non",
      confirmationText: "Oui",
      title: "Confirmation d'un candidat",
      description: `Êtes-vous sûr de cette réponse?`,
    }).then(() => {
      candidat.confirmationCandidat = rep;
      axios
        .put(`http://localhost:8034/candidats/updateConfirmation`, candidat)
        .then(() => {
          setIsChangedCandidat(true);
          setIsChangedCandidat(false);
          toastr.info("", "État de confirmation enregistrée", {
            closeButton: false,
            timeOut: 4000,
            extendedTimeOut: 100,
          });
        })
        .catch((error) => {
          candidat.confirmationCandidat = "";
          toastr.error("Erreur de mise à jour des confirmations des candidats");
        });
    });
  };

  const accepter = () => {
    handleClose();
    // candidat.confirmationCandidat = "O";
    // console.log("accepter::::", JSON.stringify(candidat));
    reponse("O");
  };
  const refuser = () => {
    handleClose();
    reponse("N");
  };
  const annuler = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Réponse du candidat {candidat.nom} {candidat.prenom}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Réponse du candidat {candidat.nom} {candidat.prenom}:
          </DialogContentText> */}
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item>
              <Button
                variant="outlined"
                style={{
                  color: "green",
                  borderColor: "Gray",
                  textTransform: "none",
                }}
                onClick={accepter}
              >
                Acceptation
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{
                  color: "red",
                  borderColor: "Gray",
                  textTransform: "none",
                }}
                onClick={refuser}
              >
                Refus
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={annuler}
            style={{
              borderColor: "Gray",
              textTransform: "none",
            }}
          >
            {" "}
            Annuler{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation;
