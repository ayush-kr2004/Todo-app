import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState, todoFilterState, filteredTodoListState } from "../store/atoms";
import { todoService } from "../services/todo.service";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [filter, setFilter] = useRecoilState(todoFilterState);
    const filteredList = useRecoilValue(filteredTodoListState);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todos = await todoService.getAllTodos();
                setTodoList(todos);
            } catch (error) {
                console.error("Failed to fetch todos", error);
            }
        };

        fetchTodos();
    }, [setTodoList]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    My Tasks
                </h1>
                <p className="text-gray-500">Manage your daily goals and productivity.</p>
            </div>

            <TodoInput />

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    {["Show All", "Show Active", "Show Completed"].map((btnFilter) => (
                        <button
                            key={btnFilter}
                            onClick={() => setFilter(btnFilter)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === btnFilter
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {btnFilter.replace("Show ", "")}
                        </button>
                    ))}
                </div>
                <div className="text-sm text-gray-500">
                    {filteredList.length} tasks
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {filteredList.map((todo) => (
                        <TodoItem key={todo._id} todo={todo} />
                    ))}
                </AnimatePresence>
                {filteredList.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300"
                    >
                        <p className="text-gray-500 text-lg">No tasks found</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
