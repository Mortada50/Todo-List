import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MySnackbarContext } from "./context/TodoContext";
import { useContext } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar() {
  const { open } = useContext(MySnackbarContext);

  return (
    <div>
      <Snackbar
        open={open.show}
        autoHideDuration={6000}
        message="Note archived"
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
