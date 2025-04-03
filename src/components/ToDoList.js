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


export default function ToDoList() {

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
    return <ToDo key={t.id} todo={t} />;
  });


  return (
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
  );
}
