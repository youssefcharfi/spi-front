import React, { Component } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import axios from "axios";
import { Grid } from "antd";
import { Container } from "@mui/material";
import toastr from "toastr";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
});

export default class DndTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      open: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.setState((state) => {
      return { items: this.props.candidats };
    });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.candidats) !=
      JSON.stringify(this.props.candidats)
    ) {
      this.setState((state) => {
        return { items: this.props.candidats };
      });
    }
  }
  handleClickOpen(){
    this.setState({
      open: true
    });
  };

  handleClose(){
    this.setState({
      open: false
    });
  };
  handleEnvoieListPrincipale(i, items) {
    i.map((candidat, index) => {
      candidat.selectionNoOrdre = index + 1;
      if (this.props.listeSelection == "LP") candidat.listeSelection = "LP";
      else candidat.listeSelection = "LA";
    });
    let msg;
    if (this.props.listeSelection == "LP")
      msg =
        "Les candidats s??lectionn??s ont bien ??t?? ajout??s ?? la liste principale.";
    else
      msg =
        "Les candidats s??lectionn??s ont bien ??t?? ajout??s ?? la liste d'attente.";
    axios
      .put(`http://localhost:8034/candidats/updateListe`, i)
      .then((res) => {
        toastr.info(msg, "Admission des candidats", {
          closeButton: false,
          timeOut: 4000,
          extendedTimeOut: 100,
        });
        this.props.setIsChangedCandidat(true);
        this.props.closeModal();
        this.props.setIsChangedCandidat(false);
      })
      .catch((error) => {
        toastr.error(
          error.response.data.errorMeassage,
          "Admission des candidats"
        );
      });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      items,
    });
  }

  render() {
    return (
      <Container>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            ??tes vous s??r d'ajouter et approuver le nouveau ordre de s??lection de la liste {this.props.listeSelection == "LP"? "principale":"d'attente"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose.bind(this)}>
            Annuler
          </Button>
          <Button onClick={this.handleEnvoieListPrincipale.bind(this, this.state.items)}>Confirmer</Button>
        </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ordre</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Pr??nom</TableCell>
              </TableRow>
            </TableHead>
            <TableBody component={DroppableComponent(this.onDragEnd)}>
              {this.state.items.map((item, index) => (
                <TableRow
                  component={DraggableComponent(item.noCandidat, index)}
                  key={item.noCandidat}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>{item.nom}</TableCell>
                  <TableCell>{item.prenom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          type="button"
          size="large"
          onClick={this.handleClickOpen.bind(this)}
          className="btn btn-primary my-3 float-right"
        >
          Ajouter
        </button>
      </Container>
    );
  }
}
const DraggableComponent = (id, index) => (props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          {...props}
        >
          {props.children}
        </TableRow>
      )}
    </Draggable>
  );
};

const DroppableComponent =
  (onDragEnd: (result, provided) => void) => (props) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"1"} direction="vertical">
          {(provided) => {
            return (
              <TableBody
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...props}
              >
                {props.children}
                {provided.placeholder}
              </TableBody>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  };
