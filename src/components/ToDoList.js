import { useState, useContext } from "react";
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

    const todosList = todos.map( (t) => {
        return <ToDo key={t.id} todo={t} />;
    });

  function handleAddClick() {
    const newTodo = {
        id: uuidv4(),
        title: titleInput,
        content: "",
        isComplete: false,
    }
    setTodos([...todos, newTodo]);
    setTitleInput("");
  }
  function handleInputChange(event) {
    setTitleInput(event.target.value)
  }

  return (
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant='h2' style={{fontWeight: "700"}}>
                المهام
                </Typography>
                <Divider />
                
                <ToggleButtonGroup
                color="primary"
                // value={alignment}
                exclusive
                // onChange={handleChange}
                aria-label="Platform"
                style={{marginTop: "30px"}}
                >
                    <ToggleButton value="web">الكل</ToggleButton>
                    <ToggleButton value="android">المنجز</ToggleButton>
                    <ToggleButton value="ios">غير منجز</ToggleButton>
                </ToggleButtonGroup>
                
                {/* List Todos */}
                {todosList}
                {/*== List Todos ==*/}
                
                {/* Widget Input & Button */}
                <Grid container spacing={2} style={{marginTop: "20px"}}>
                <Grid size={8}>
                    <TextField id="outlined-basic" value={titleInput} onChange={ handleInputChange } label="عنوان المهمة" variant="outlined" style={{width: "100%"}}/>
                </Grid>
                <Grid size={4}>
                <Button variant="contained" style={{width: "100%", height: "100%"}} onClick={handleAddClick} >إضافة مهمة</Button>
                </Grid>
                </Grid>
                {/*== Widget Input & Button ==*/}

            </CardContent>
        </Card>
      </Container>
  );
}
