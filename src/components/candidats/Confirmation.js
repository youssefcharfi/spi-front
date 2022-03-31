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
      title: "Réponse de la confirmation du candidat",
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
          {"Mise à jour de l'état de confirmation du candidat"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Réponse du candidat :
            {candidat.nom} {candidat.prenom}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignItems: "center" }}>
          <Button onClick={accepter}>Acceptation</Button>
          <Button onClick={refuser}>Refus</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation;
