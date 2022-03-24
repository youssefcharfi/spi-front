import React, { Component } from "react"
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ReactDOM from "react-dom"
import axios from "axios"

const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        primary: `item ${k}`,
        secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
    }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
})


export default class DndTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    componentDidMount(){
        axios
      .get(
        `http://localhost:8034/promotions/M2DOSI/2013-2014`
      )
      .then((res) => {
        console.log(res.data?.candidats?.filter(cand => cand.listeSelection === "LP"));
        this.setState((state) => {
            return {items : res.data?.candidats?.filter(cand => cand.listeSelection === "LP")}
        })
      })
      .catch((err) => {
      }, []);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        )
        console.log(items);
        this.setState({
            items
        })
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ORDER</TableCell>
                            <TableCell>NOM</TableCell>
                            <TableCell>PRENOM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody component={DroppableComponent(this.onDragEnd)}>
                        {this.state.items.map((item, index) => (
                            <TableRow component={DraggableComponent(item.noCandidat, index)} key={item.noCandidat} >
                                <TableCell scope="row">{index + 1}</TableCell>
                                <TableCell>{item.nom}</TableCell>
                                <TableCell>{item.prenom}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
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
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}

                    {...props}
                >
                    {props.children}
                </TableRow>
            )}
        </Draggable>
    )
}

const DroppableComponent = (
    onDragEnd: (result, provided) => void) => (props) =>
{
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'1'} direction="vertical">
                {(provided) => {
                    return (
                        <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
                            {props.children}
                            {provided.placeholder}
                        </TableBody>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}