import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

import { TodosContext } from "../contexts/TodosContext";
import { useContext } from 'react';


export default function ToDo({ todo }) {

    const { todos, setTodos } = useContext(TodosContext);

    const [showDialogUpdate, setShowDialogUpdate] = React.useState(false);
    const [showDialogDelete, setShowDialogDelete] = React.useState(false);
    const [inputFormUpdate, setInputFormUpdate] = React.useState({ title: todo.title, content: todo.content});

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
    function handleDeleteClick() {
        
        const updateTodos = todos.filter( (t) => {
            return t.id != todo.id;
        });
        setTodos(updateTodos);
        localStorage.setItem("todos", JSON.stringify(updateTodos) );
        handleDeleteDialogClose();
    }
    function handleUpdateClick() {

        const updateTodos = todos.map( (t) => {
            if(t.id == todo.id) {
                return { ...t, title: inputFormUpdate.title, content: inputFormUpdate.content };
            }
            return t;
        } );
        setTodos(updateTodos);
        localStorage.setItem("todos", JSON.stringify(updateTodos) );
        handleUpdateDialogClose();
    }

    {/* Action Dialog */}
    const handleUpdateDialogOpen = () => {
        setShowDialogUpdate(true);
    };
    const handleUpdateDialogClose = () => {
        setShowDialogUpdate(false);
    }

    const handleDeleteDialogOpen = () => {
        setShowDialogDelete(true);
    };
    const handleDeleteDialogClose = () => {
        setShowDialogDelete(false);
    };
    {/*== Action Dialog ==*/}

    return(
        <>
        {/* Delete Dialog */}
        <Dialog
            style={{direction: "rtl"}}
            open={showDialogDelete}
            onClose={handleDeleteDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                هل تريد حذف المهمة ؟
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                لا يمكنك التراجع عن هذا الحذف.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDeleteDialogClose}>إلغاء</Button>
            <Button onClick={handleDeleteClick} autoFocus>نعم</Button>
            </DialogActions>
        </Dialog>
        {/*== Delete Dialog ==*/}

        {/* Update Dialog */}
        <Dialog
            style={{direction: "rtl"}}
            open={showDialogUpdate}
            onClose={handleUpdateDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                تعديل المهمة
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="عنوان المهمة"
                    fullWidth
                    variant="standard"
                    value={ inputFormUpdate.title }
                    onChange={ (e) => {
                        setInputFormUpdate({ ...inputFormUpdate, title: e.target.value });
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    label="تفاصيل المهمة"
                    fullWidth
                    variant="standard"
                    value={ inputFormUpdate.content }
                    onChange={ (e) => {
                        setInputFormUpdate({ ...inputFormUpdate, content: e.target.value });
                    }}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleUpdateDialogClose}>إلغاء</Button>
            <Button onClick={handleUpdateClick} autoFocus>تحديث</Button>
            </DialogActions>
        </Dialog>
        {/*== Update Dialog ==*/}

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