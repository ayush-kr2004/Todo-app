import api from "./api";

export const authService = {
    signup: async (userData) => {
        const response = await api.post("/user/signup", userData);
        return response.data;
    },

    signin: async (credentials) => {
        const response = await api.post("/user/signin", credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },
};
