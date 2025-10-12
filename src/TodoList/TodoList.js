import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// DAILOG
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodo } from "./context/TodoContext";
// COMPONENTS
import Todo from "./Todo";
// OTHERS

import { useContext, useEffect, useState, useMemo } from "react";
import { MySnackbarContext } from "./context/TodoContext";


export default function SimpleContainer() {
  const [todos, dispatch] = useTodo();
  const { setOpen } = useContext(MySnackbarContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog2] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    details: "",
  });

  const [todoId, setTodoId] = useState(null);
  const [updateTodoId, setUpdateTodoId] = useState(null);
  // FILTERATION ARRAYS

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRenderd = todos;
  if (displayTodosType == "completed") {
    todosToBeRenderd = completedTodos;
  } else if (displayTodosType == "non-completed") {
    todosToBeRenderd = notCompletedTodos;
  } else {
    todosToBeRenderd = todos;
  }
  const todosJsx = todosToBeRenderd.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDeleteDialog={showDeleteDialog1}
        showUpdateDialog={showUpdateDialog1}
      />
    );
  });

  useEffect(() => {dispatch({type:"load-todos"})}, []);

  // =======HANDLERS
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function showDeleteDialog1(id) {
    setShowDeleteDialog(true);
    setTodoId(id);
  }

  function handleDeleteConfirm() {
    dispatch({type:"deleted", payload:todoId})
    handleDeleteDialogClose();
    setOpen({ show: true, message: "تم حذف المهمة بنجاح" });
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog2(false);
  }
  function showUpdateDialog1(todo) {
    const updatedtodo = todos.filter((t) => {
      return t.id == todo.id;
    });
    setUpdateTodoId(todo.id);
    setShowUpdateDialog2(true);
    setUpdatedTodo({
      title: updatedtodo[0].title,
      details: updatedtodo[0].details,
    });
  }

  function handleUpdateConfirm() {
    dispatch({type:"updated", payload:{updateTodoId, updatedTodo }})
    handleUpdateDialogClose();
    setOpen({ show: true, message: "تم تعديل المهمة بنجاح" });
  }
  function changeDisplayedType(event) {
    setDisplayTodosType(event.target.value);
  }
  const [titleInput, setTitleInput] = useState("");
  function handleAddClick() {
    dispatch({ type: "added", payload: { title: titleInput } });
    setTitleInput("");
    setOpen({ show: true, message: "تم إضافة المهمة بنجاح" });
  }

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/*== DELETE DIALOG== */}
      {/* UPDATE DIALOG */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            value={updatedTodo.title}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            value={updatedTodo.details}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إغلاق</Button>
          <Button
            disabled={updatedTodo.title == "" ? true : false}
            autoFocus
            onClick={handleUpdateConfirm}
          >
            تحديث
          </Button>
        </DialogActions>
      </Dialog>

      {/*== UPDATE DIALOG== */}
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h3">مهامي</Typography>
            <Divider />
            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "20px" }}
              value={displayTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/* FILTER BUTTONS */}

            {/* ALL TODOS */}

            {todosJsx}

            {/* ALL TODOS */}

            {/* INPUT + ADD BUTTON */}
            <Grid container style={{ marginTop: "25px" }} spacing={2}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(event) => {
                    setTitleInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* INPUT + ADD BUTTON */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
