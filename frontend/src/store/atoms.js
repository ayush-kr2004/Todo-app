import { atom, selector } from "recoil";

// Auth Atom
export const userState = atom({
    key: "userState",
    default: {
        isAuthenticated: !!localStorage.getItem("token"),
        token: localStorage.getItem("token"),
        user: null,
    },
});

// Todo List Atom
export const todoListState = atom({
    key: "todoListState",
    default: [],
});

// Todo Filter Atom
export const todoFilterState = atom({
    key: "todoFilterState",
    default: "Show All", // Options: "Show All", "Show Completed", "Show Active"
});

// Filtered Todo List Selector
export const filteredTodoListState = selector({
    key: "filteredTodoListState",
    get: ({ get }) => {
        const filter = get(todoFilterState);
        const list = get(todoListState);

        switch (filter) {
            case "Show Completed":
                return list.filter((item) => item.completed);
            case "Show Active":
                return list.filter((item) => !item.completed);
            default:
                return list;
        }
    },
});
