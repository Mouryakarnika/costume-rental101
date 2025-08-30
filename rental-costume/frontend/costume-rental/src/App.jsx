import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "./pages/usercontext"; // ✅ import from your file

export default function App() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();         // removes user from context & localStorage
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-70 backdrop-blur-md shadow-md flex flex-wrap items-center justify-center sm:justify-between px-6 py-4 border-b border-pink-100 sticky top-0 z-50">
        <div className="text-2xl font-bold text-purple-700 mb-2 sm:mb-0">
          Costume Rental
        </div>
        <div className="flex flex-wrap gap-4 text-purple-700 font-medium text-lg">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition"
          >
            Dashboard
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium hover:from-pink-500 hover:to-purple-500 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
