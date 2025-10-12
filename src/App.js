import "./App.css";
import TodoList from "./TodoList/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TostProvider, TodoProvider } from "./TodoList/context/TodoContext";
import MySnackbar from "./TodoList/MySnackbar";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

function App() {
  // pureComponent

  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            direction: "rtl",
          }}
        >
          <TostProvider>
            <MySnackbar />

            <TodoList />
          </TostProvider>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}



export default App;
