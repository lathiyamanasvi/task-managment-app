import { useState } from "react";
import { toast } from "react-toastify";

function TaskManager() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [taskInput, setTaskInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    const handleAddTask = () => {
        if (taskInput.trim() === "") {
            toast.error("Task cannot be empty!");
            return;
        }

        if (isEditing) {

            const updatedTasks = tasks.map((task, index) =>
                index === currentTaskIndex ? taskInput : task
            );
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setIsEditing(false);
            toast.success("Task updated successfully!");
        } else {

            const updatedTasks = [...tasks, taskInput];
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            toast.success("Task added successfully!");
        }

        setTaskInput(""); // Clear input
    };

    const handleEditTask = (index) => {
        setTaskInput(tasks[index]);
        setIsEditing(true);
        setCurrentTaskIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        toast.info("Task deleted!");
    };

    return (
        <div>
            <center>
                <h2 className="my-5 text-center">Task Manager</h2>
                <input
                    className="rounded-pill pe-5 ps-3 py-3 w-50"
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter task"
                />
                <button onClick={handleAddTask} className="rounded-pill ms-3 py-3 px-5 text-white bg-primary border-0">
                    {isEditing ? "Update Task" : "Add Task"}
                </button>

                <ul className="border w-50 mt-5 px-3 shadow">
                    {tasks.map((task, index) => (
                        <li key={index} className="d-flex justify-content-between border rounded my-2 px-3 py-2">
                            {task}
                            <div>
                                <button onClick={() => handleEditTask(index)} className="me-2 btn btn-info text-white">Edit</button>
                                <button onClick={() => handleDeleteTask(index)} className="btn btn-danger text-white">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </center>
        </div>
    );
}

export default TaskManager;
