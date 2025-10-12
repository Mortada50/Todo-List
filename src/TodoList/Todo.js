import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { MySnackbarContext } from "./context/TodoContext";
import { useTodo } from "./context/TodoContext";

// ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// CSS
import "./TodoList.css";

export default function Todo({ todo, showDeleteDialog, showUpdateDialog }) {
  const [todos, dispatch] = useTodo();
  const { setOpen } = useContext(MySnackbarContext);

  // EVENT HANDLER
  function handleDeleteClick() {
    showDeleteDialog(todo.id);

  }
  function handleUpdateClick() {
    showUpdateDialog(todo);
  }

  function handleCheckClick() {
    dispatch({ type: "check-click", payload: { id: todo.id } });
    setOpen({ show: true, message: "تم التعديل" });
    
  }

  // EVENT HANDLER===
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* ACTION BUTTONS */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* CHECK ICON BUTTON */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/*== CHECK ICON BUTTON ==*/}
              {/* UPDATE ICON BUTTON */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/*== UPDATE ICON BUTTON== */}
              {/* DELETE ICON */}
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/*== DELETE ICON== */}
            </Grid>
            {/* ACTION BUTTONS */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
