import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import About from "./pages/About";

import Menu from "./pages/Menu";

import Contact from "./pages/Contact";

import Admin from "./pages/Admin";

import { api } from "./lib/api";

// Protect the admin page.

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    let active = true;

    api.getCurrentAdmin()
      .then(() => {
        if (active) {
          setAuthenticated(true);
        }
      })
      .catch(() => {
        if (active) {
          setAuthenticated(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (authenticated === null) {
    return (
      <div className="
        min-h-[60vh]
        flex items-center justify-center
      ">
        <p>Verifying administrator session...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <div className="
      min-h-screen
      flex flex-col
    ">

      <Navbar />

      <main className="flex-1">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/menu"
            element={<Menu />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;