import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import LoginModal from "./LoginModal";

import { api } from "../lib/api";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const [admin, setAdmin] = useState(null);

  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    api.getCurrentAdmin()
      .then((result) => {
        if (active) {
          setAdmin(result.admin);
        }
      })
      .catch(() => {
        if (active) {
          setAdmin(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);

    setShowLogin(false);

    navigate("/admin");
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await api.logout();

      setAdmin(null);

      navigate("/");

    } catch (error) {
      console.error(error);

      alert("Unable to log out. Please try again.");

    } finally {
      setLoggingOut(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-yellow-300"
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <>
      <header>
        <nav className="bg-black border-b-4 border-orange-500 py-5">
          <div
            className="
              w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between
            "
          >
            {/* Logo */}
            <Link
              to="/"
              className="
                text-orange-400 text-2xl font-bold no-underline
              "
            >
              Reana's Restaurant
            </Link>

            {/* Navigation */}
            <div className="
              flex flex-wrap
              items-center
              justify-center
              gap-5
            ">
              <NavLink
                to="/"
                end
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={navLinkClass}
              >
                About
              </NavLink>

              <NavLink
                to="/menu"
                className={navLinkClass}
              >
                Menu
              </NavLink>

              <NavLink
                to="/contact"
                className={navLinkClass}
              >
                Contact
              </NavLink>

              {!admin ? (
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-red-900
                    font-bold
                    px-5 py-2
                    rounded-md
                    transition-colors
                  "
                >
                  Login
                </button>
              ) : (
                <>
                  <NavLink
                    to="/admin"
                    className={navLinkClass}
                  >
                    Admin
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="
                      bg-white
                      hover:bg-gray-200
                      text-red-900
                      font-bold
                      px-4 py-2
                      rounded-md
                    "
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Navbar;