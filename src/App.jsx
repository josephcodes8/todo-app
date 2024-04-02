import {
  LayoutList,
  ListPlus,
  Square,
  SquareCheckBig,
  Trash,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInput = (e) => {
    setTask((t) => (t = e.target.value));
  };

  const addTask = () => {
    if (task.length !== 0) {
      setTodos((t) => [
        ...t,
        {
          task: capitalize(task),
          markedComplete: false,
        },
      ]);
      setTask((t) => (t = ""));
    }
  };

  const deleteTask = (id) => {
    setTodos(
      (t) =>
        (t = t.filter((todo, _id) => {
          return id !== _id && todo;
        }))
    );
  };

  const toggleMarkATaskAsComplete = (id) => {
    setTodos(
      (t) =>
        (t = todos.map((todo, _id) => {
          if (id === _id) {
            return { task: todo.task, markedComplete: !todo.markedComplete };
          }
          return todo;
        }))
    );
  };

  const increasePriority = (id) => {
    let temp = todos.slice()[id - 1];
    setTodos(
      (t) =>
        (t = t.map((todo, _id) => {
          if (_id == id - 1) {
            return todos[id];
          }
          if (_id == id) {
            return temp;
          }
          return todo;
        }))
    );
  };

  const decreasePriority = (id) => {
    let temp = todos.slice()[id + 1];
    setTodos(
      (t) =>
        (t = t.map((todo, _id) => {
          if (_id == id) {
            return temp;
          }

          if (_id == id + 1) {
            return todos[id];
          }

          return todo;
        }))
    );
  };

  const content = todos.map(({ task, markedComplete }, id) => {
    return (
      <li className="mb-4 flex justify-between" key={id}>
        <div className="flex space-x-2 items-center">
          {markedComplete ? (
            <SquareCheckBig
              size={16}
              onClick={() => toggleMarkATaskAsComplete(id)}
            />
          ) : (
            <Square size={16} onClick={() => toggleMarkATaskAsComplete(id)} />
          )}
          <p className={`text-sm ${markedComplete && "line-through"}`}>
            {task}
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => deleteTask(id)}
              className="py-1 px-4 flex space-x-2 rounded-md items-center text-nowrap bg-red-400 hover:bg-red-500"
            >
              <Trash size={16} color="white" />
              <span className="text-white">Delete</span>
            </button>
            {id != 0 && (
              <button
                className=" hover:bg-gray-100 p-2 rounded-full"
                title="Increase Priority"
                onClick={() => increasePriority(id)}
              >
                <ChevronUp size={16} />
              </button>
            )}
            {id !== todos.length - 1 && (
              <button
                className=" hover:bg-gray-100 p-2 rounded-full"
                title="Decrease Priority"
                onClick={() => decreasePriority(id)}
              >
                <ChevronDown size={16} />
              </button>
            )}
          </div>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="p-8 md:max-w-[600px]">
        <header className="flex  items-center space-x-4">
          <LayoutList size={32} />
          <div>
            <h1 className="text-3xl font-bold">Todos.</h1>
            <p>Enter tasks to perform later.</p>
          </div>
        </header>
        <main className="mt-4">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={handleInput}
              className="w-full px-4 py-2 border-gray-100 border-2 rounded-md bg-gray-100 transition-all"
            />
            <button
              className="flex space-x-2 justify-center bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md focus:ring-2 focus:ring-green-200 text-nowrap sm:max-w-[300px]"
              onClick={addTask}
            >
              <ListPlus color={"white"} />
              <span className="text-white">Add task</span>
            </button>
          </div>
          <ul className="mt-6 ml-4">
            {todos.length > 0 ? content : <p>No task has been registered.</p>}
          </ul>
        </main>
      </div>
    </>
  );
};

export default App;

const capitalize = (sentence) => {
  const exceptions = [
    "and",
    "but",
    "or",
    "nor",
    "for",
    "so",
    "yet",
    "as",
    "at",
    "by",
    "for",
    "in",
    "of",
    "on",
    "to",
    "with",
  ];

  return sentence
    .split(" ")
    .map((word) => {
      if (exceptions.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + "" + word.slice(1).toLowerCase();
    })
    .join(" ");
};
