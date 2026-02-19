import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../store/atoms";
import { todoService } from "../services/todo.service";
import { FaTrash, FaCheck, FaUndo, FaEdit } from "react-icons/fa";
import clsx from "clsx";
import { motion } from "framer-motion";



const TodoItem = ({ todo }) => {
    const setTodoList = useSetRecoilState(todoListState);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.description);

    const handleToggleComplete = async () => {
        try {
            // Backend update
            await todoService.updateTodo(todo._id, {
                completed: !todo.completed,
            });

            // UI update
            setTodoList((oldList) =>
                oldList.map((item) =>
                    item._id === todo._id ? { ...item, completed: !item.completed } : item
                )
            );
        } catch (error) {
            console.error("Failed to toggle todo", error);
        }
    };

    const handleDelete = async () => {
        try {
            await todoService.deleteTodo(todo._id);
            setTodoList((oldList) => oldList.filter((item) => item._id !== todo._id));
        } catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await todoService.updateTodo(todo._id, {
                title: editTitle,
                description: editDesc,
            });
            setTodoList((oldList) =>
                oldList.map((item) =>
                    item._id === todo._id ? { ...item, title: editTitle, description: editDesc } : item
                )
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={clsx(
                "p-4 rounded-lg shadow-sm border mb-3 transition-all duration-300 hover:shadow-md",
                todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100"
            )}
        >
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setIsEditing(false)} className="text-gray-500 text-sm hover:text-gray-700">Cancel</button>
                        <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Save</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleToggleComplete}
                                className={clsx(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                    todo.completed
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-300 text-transparent hover:border-green-500"
                                )}
                            >
                                <FaCheck size={12} />
                            </button>
                            <h3 className={clsx("font-semibold text-lg", todo.completed && "line-through text-gray-400")}>
                                {todo.title}
                            </h3>
                        </div>
                        {todo.description && (
                            <p className={clsx("text-gray-600 mt-1 ml-9 text-sm", todo.completed && "text-gray-400")}>
                                {todo.description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-gray-400 hover:text-blue-500 transition rounded-full hover:bg-blue-50"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
                            title="Delete"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TodoItem;
