// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// export default function ToDoList() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }
// =========== //
// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AlarmIcon from '@mui/icons-material/Alarm';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// export default function ToDoList() {
//   return (
//     <Stack direction="row" spacing={1}>
//       <IconButton aria-label="delete">
//         <DeleteIcon />
//       </IconButton>
//       <IconButton aria-label="delete" disabled color="primary">
//         <DeleteIcon />
//       </IconButton>
//       <IconButton color="secondary" aria-label="add an alarm">
//         <AlarmIcon />
//       </IconButton>
//       <IconButton color="primary" aria-label="add to shopping cart">
//         <AddShoppingCartIcon />
//       </IconButton>
//     </Stack>
//   );
// }
//========= //
// import * as React from 'react';
import { useState } from "react";
// import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ToDo2 from './ToDo2';
import { v4 as uuidv4 } from 'uuid';


const initialTodos = [
    {
        id: uuidv4(),
        title: "Title 4",
        content: "Content 4",
        isComplete: false,
    },
    {
        id: uuidv4(),
        title: "Title 5",
        content: "Content 5",
        isComplete: false,
    },
    {
        id: uuidv4(),
        title: "Title 6",
        content: "Content 6",
        isComplete: false,
    },
]

export default function ToDoList2() {

    const [todos, setTodos] = useState(initialTodos);
    const [titleInput, setTitleInput] = useState("");

    const todosList = todos.map( (t) => {
        return <ToDo2 key={t.id} todo={t} handleCheck={handleCheckClick}/>;
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

  function handleCheckClick(id) {
    const updateTodos = todos.map( (t) => {
        if(t.id == id) {
            t.isComplete = !t.isComplete; 
        }
        return t;
    } );
    setTodos(updateTodos);
    
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
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
      </Container>
  );
}
