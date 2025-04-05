import { useState, useContext, useEffect, useMemo } from "react";
// import * as React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ToDo from './ToDo';
import { TodosContext } from "../contexts/TodosContext";
import { v4 as uuidv4 } from 'uuid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ToDoList() {

  console.log("ReREnder ..")

  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

  useEffect( () => {
    console.log("test effect");
    const initilaTodosList = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos( initilaTodosList );
    console.log(initilaTodosList);
  }, [] );

    

  function handleAddClick() {
    const newTodo = {
        id: uuidv4(),
        title: titleInput,
        content: "",
        isComplete: false,
    }
    const newTodos = [ ...todos, newTodo ];
    setTodos( newTodos );
    localStorage.setItem("todos", JSON.stringify( newTodos ) );
    setTitleInput("");
  }
  function handleInputChange(event) {
    setTitleInput(event.target.value)
  }

  function handleChangeDisplayTodos(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }


  // Dialog //

  const [showDialogUpdate, setShowDialogUpdate] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);

  const [dialogUpdateTodo, setDialogUpdateTodo] = useState(null);
  const [dialogDeleteTodo, setDialogDeleteTodo] = useState(null);

  let testv = (d) => {
    console.log("D: ", d);
    if(d) {
      console.log("DD: Not NULL");
      return d.title;
    } else {
      console.log("DD: ", d);
      return "AX";
      // return d.title;
    }
  }
  // Dialogs Update Handlers //
  console.log("DU: ", dialogUpdateTodo);

  // const [inputFormUpdate, setInputFormUpdate] = useState({ 
  //   title: testv(dialogUpdateTodo) , 
  //   content: (dialogUpdateTodo) ? dialogUpdateTodo.content : "B",
  // });
  const [inputFormUpdate, setInputFormUpdate] = useState({ title: "", content: ""});
  console.log("F: ", inputFormUpdate);

  // useEffect( () => {
  //   const ddd = dialogUpdateTodo;
  //   console.log("EFFct: ", ddd?.title||"OO");
  //   // setInputFormUpdate({title: dialogUpdateTodo.title, content: dialogUpdateTodo.content});
  //   setInputFormUpdate({title: "E", content: "Z"});
  // }, [dialogUpdateTodo]);

  function handleUpdateConfirm() {

    const updateTodos = todos.map( (t) => {
        if(t.id == dialogUpdateTodo.id) {
            return { ...t, title: inputFormUpdate.title, content: inputFormUpdate.content };
        }
        return t;
    } );
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos) );
    handleUpdateDialogClose();
}
  const handleUpdateDialogOpen = ( todo ) => {
    console.log("OPEN U: ", todo );
    setDialogUpdateTodo( todo );
    setInputFormUpdate({ title: todo.title, content: todo.content });
    setShowDialogUpdate(true);
    console.log("End Fun Open")
  };
  const handleUpdateDialogClose = () => {
    setDialogUpdateTodo( null );
    setShowDialogUpdate(false);
  }

  // Dialogs Delete Handlers //

  function handleDeleteConfirm() {
    const updateTodos = todos.filter( (t) => {
      return t.id != dialogDeleteTodo.id;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos) );
    handleDeleteDialogClose();
  }
  const handleDeleteDialogOpen = ( todo ) => {
    setDialogDeleteTodo( todo );
    setShowDialogDelete(true);
  };
  const handleDeleteDialogClose = () => {
    setDialogDeleteTodo( null );
    setShowDialogDelete(false);
  };


  //  TODOS //

  let todosFilter = todos;

  let todosFilter2 = useMemo( () => {
      console.log("re render todos");
      return todosFilter = todos.filter( (t) => {
        return t.isComplete;
      });
  } , [todos] );

  if( displayTodosType == "completed" ) {
    // todosFilter = todos.filter( (t) => {
    //   return t.isComplete;
    // });
    todosFilter = todosFilter2;
  } else if( displayTodosType == "non-completed" ) {
    todosFilter = todos.filter( (t) => {
      return !t.isComplete;
    });
  } else {
    todosFilter = todos;
  }

  const todosRender = todosFilter.map( (t) => {
    return <ToDo key={t.id} todo={t} showDialogUpdate={ handleUpdateDialogOpen } showDialogDelete={ handleDeleteDialogOpen }/>;
  });


  return (
    <>
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
          <Button onClick={handleUpdateConfirm} autoFocus>تحديث</Button>
          </DialogActions>
      </Dialog>
      {/*== Update Dialog ==*/}

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
          <Button onClick={handleDeleteConfirm} autoFocus>نعم</Button>
          </DialogActions>
      </Dialog>
      {/*== Delete Dialog ==*/}

      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}>
            <CardContent>
                <Typography variant='h2' style={{fontWeight: "700"}}>
                المهام
                </Typography>
                <Divider />
                
                <ToggleButtonGroup
                color="primary"
                value={displayTodosType}
                exclusive
                onChange={handleChangeDisplayTodos}
                aria-label="Platform"
                style={{marginTop: "30px", direction: "ltr"}}
                >
                    <ToggleButton value="non-completed">غير منجز</ToggleButton>
                    <ToggleButton value="completed">المنجز</ToggleButton>
                    <ToggleButton value="all">الكل</ToggleButton>
                </ToggleButtonGroup>
                
                {/* List Todos */}
                {todosRender}
                {/*== List Todos ==*/}
                
                {/* Widget Input & Button */}
                <Grid container spacing={2} style={{marginTop: "20px"}}>
                <Grid size={8}>
                    <TextField id="outlined-basic" value={titleInput} onChange={ handleInputChange } label="عنوان المهمة" variant="outlined" style={{width: "100%"}}/>
                </Grid>
                <Grid size={4}>
                <Button variant="contained" style={{width: "100%", height: "100%"}} onClick={handleAddClick} disabled={titleInput.length == "0"}>إضافة مهمة</Button>
                </Grid>
                </Grid>
                {/*== Widget Input & Button ==*/}

            </CardContent>
        </Card>
      </Container>
    </>
  );
}
