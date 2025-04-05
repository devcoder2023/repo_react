import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

import { TodosContext } from "../contexts/TodosContext";
import { useContext } from 'react';


export default function ToDo({ todo , showDialogUpdate, showDialogDelete }) {

    const { todos, setTodos } = useContext(TodosContext);


    function handleCheckClick() {

        const updateTodos = todos.map( (t) => {
            if(t.id == todo.id) {
                t.isComplete = !t.isComplete; 
            }
            return t;
        } );
        setTodos(updateTodos);
        localStorage.setItem("todos", JSON.stringify(updateTodos) );
        
    }

    {/* Action Dialog */}
    const handleUpdateDialogOpen = () => {
        showDialogUpdate( todo );
    };

    const handleDeleteDialogOpen = () => {
        showDialogDelete( todo );
    };
    {/*== Action Dialog ==*/}

    return(
        <>

        <Card className='cardToDo' sx={{ minWidth: 275, background: "#428aa3", color: "white", marginTop: 5}}>
            <CardContent>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Typography variant='h5' sx={{textAlign: "right", fontFamily: "zain", fontWeight: "400", textDecoration: todo.isComplete ? "line-through" : "none" }}>
                    {todo.title}
                    </Typography>
                    <Typography variant='h6' sx={{textAlign: "right", fontFamily: "zain", fontWeight: "300"}}>
                    {todo.content}
                    </Typography>
                </Grid>
                <Grid size={4} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <IconButton className='iconButtonToDo' style={{color: todo.isComplete ? "white" : "lightgreen", backgroundColor: todo.isComplete ? "lightgreen" : "white", border: "2px solid lightgreen"}} onClick={handleCheckClick}>
                    <CheckIcon />
                </IconButton>
                <IconButton className='iconButtonToDo' style={{color: "#ff8066", backgroundColor: "white", border: "2px solid #ff8066"}} onClick={handleUpdateDialogOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton className='iconButtonToDo' style={{color: "#d03b29", backgroundColor: "white", border: "2px solid #d03b29"}} onClick={handleDeleteDialogOpen}>
                    <DeleteIcon />
                </IconButton>
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        
        </>
    );
}