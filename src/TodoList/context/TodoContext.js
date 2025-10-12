import { createContext, useReducer, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import todoReduser from "../../reduser/todoReduser";

export const TodosContext = createContext([]);
export const MySnackbarContext = createContext({ show: false, message: "" });


export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReduser, []);
  return (
    <TodosContext.Provider value={[todos, dispatch]}>
      {children}
    </TodosContext.Provider>
  );
};
export const useTodo = () => {
  return useContext(TodosContext);
};
export const TostProvider = ({ children }) => {
  const [open, setOpen] = useState({ show: false, message: "" });
  if (open.show) {
    setTimeout(() => {
      setOpen({ ...open, show: false });
    }, 2000);
  }
  return (
    <MySnackbarContext.Provider value={{ open, setOpen }}>
      {children}
    </MySnackbarContext.Provider>
  );
};
