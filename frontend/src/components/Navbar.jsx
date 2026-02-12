import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { authService } from "../services/auth.service";

const Navbar = () => {
    const user = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        setUser({ isAuthenticated: false, token: null, user: null });
        navigate("/signin");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            TodoApp
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user.isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-red-500 transition px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className="text-gray-600 hover:text-blue-500 transition px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white transition px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
