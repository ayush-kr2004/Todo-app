import api from "./api";

export const todoService = {
    getAllTodos: async () => {
        const response = await api.get("/todo");
        return response.data;
    },

    createTodo: async (todoData) => {
        const response = await api.post("/todo", todoData);
        return response.data;
    },

    updateTodo: async (todoId, updateData) => {
        const response = await api.put("/todo", { todoId, ...updateData });
        return response.data;
    },

    deleteTodo: async (todoId) => {
        // Backend expects todoId in body for DELETE
        const response = await api.delete("/todo", { data: { todoId } });
        return response.data;
    },
};
