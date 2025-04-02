import logo from './logo.svg';
import './App.css';
import ToDoList from './components/ToDoList';
import ToDoList2 from './components/ToDoList2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  typography: {
    fontFamily: [
      "zain"
    ]
  }
});

function App() {

    const initialTodos = [
      {
          id: uuidv4(),
          title: "Title 1",
          content: "Content 1",
          isComplete: false,
      },
      {
          id: uuidv4(),
          title: "Title 2",
          content: "Content 2",
          isComplete: false,
      },
      {
          id: uuidv4(),
          title: "Title 3",
          content: "Content 3",
          isComplete: false,
      },
    ]

    const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{ height: "100vh", display: "flex", alignItems: "center", background: "#212121", direction: "rtl"}}>

      <TodosContext.Provider value={{todos: todos, setTodos: setTodos}}>
        <ToDoList />
      </TodosContext.Provider>

    </div>
    </ThemeProvider>
  );
}

export default App;
