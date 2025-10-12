import { v4 as uuidv4 } from "uuid";
export default function todoReduser(currentTodo, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodo, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updatedTodos = currentTodo.map((t) => {
        if (t.id == action.payload.updateTodoId) {
          return {
            ...t,
            title: action.payload.updatedTodo.title,
            details: action.payload.updatedTodo.details,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodo.filter((t) => {
        return t.id != action.payload;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "load-todos": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    case "check-click": {
      const cnCompleted = currentTodo.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodo;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(cnCompleted));
      return cnCompleted;
    }
    default: {
      throw Error("Unknown syntacs" + action.type);
    }
  }
}
