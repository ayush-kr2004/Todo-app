import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../store/atoms";
import { todoService } from "../services/todo.service";
import { FaPlus } from "react-icons/fa";

const TodoInput = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const setTodoList = useSetRecoilState(todoListState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const response = await todoService.createTodo({
                title,
                description,
            });

            // Optimistically add to list or fetch fresh list.
            // Since backend returns "todo" (ID), we might need to construct the object or fetch all.
            // For now, let's just trigger a re-fetch logic in Dashboard or add manually with returned ID.
            // Best to fetch all to ensure consistency, but for speed let's push.

            // Actually, better to just let Dashboard handle data fetching, or update atom here.
            // Let's assume we reload the list or push a temp obj.
            // Since backend structure is specific, let's re-fetch in Dashboard for simplicity, 
            // OR better: return the full object from backend. 
            // Current backend returns { message: "Todo ceated", todo: newTodo._id }
            // We lack the full object. So we must Re-fetch.

            // Wait, for a smooth UI, we should probably update the atom locally if we had the full object.
            // Given backend limitation, triggering a re-fetch is safest.

            // For now, I will clear inputs and let the user see the update on refresh 
            // OR I can inject a "pending" item.
            // Let's rely on a global refresh trigger or just manual reload for this step, 
            // BUT to make it "Beautiful" and "Responsive", I should probably fix the backend to return the object.
            // backend/routes/todo.route.js returns `todo: newTodo._id`.
            // I'll stick to re-fetching or just adding a partial object and reloading.

            // Let's modify the atom to include a "version" or "refresh" trigger? 
            // Or simply append to the list state with a placeholder ID if needed, but since we have ID...

            const newTodo = {
                _id: response.todo,
                title,
                description,
                completed: false,
                // userId: "current", 
            }

            setTodoList((oldTodoList) => [...oldTodoList, newTodo]);
            setTitle("");
            setDescription("");

        } catch (error) {
            console.error("Failed to add todo", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow space-y-2">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-gray-600"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 shadow-sm h-fit self-end md:self-center"
                >
                    <FaPlus /> Add
                </button>
            </form>
        </div>
    );
};

export default TodoInput;
