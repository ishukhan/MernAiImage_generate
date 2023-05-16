import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { useAuth0 } from "@auth0/auth0-react";
import { SocialIcon } from "react-social-icons";

import { Home, CreatePost } from "./pages";

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <BrowserRouter>
      <header
        className="w-full flex justify-between items-center bg-white flex-col sm:flex-row
    sm:px-8 px-4 py-4 border-b border-b-[#ebe6e4]"
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex gap-5 mt-4 sm:mt-0 ">
          <>
            {isAuthenticated && (
              <div className="flex justify-center items-center gap-5">
                <Link
                  to="/create-post"
                  className="font-inter font-medium
        bg-[#6469ff] text-white px-4 py-2 rounded-md "
                >
                  Create
                </Link>

                <img
                  src={user.picture}
                  alt={user.name}
                  className="block sm:hidden rounded-sm"
                  style={{ width: 25, height: 25 }}
                />

                <h2 className="text-[#000000] font-serif font-bold hidden sm:block">
                  {user.email}
                </h2>
              </div>
            )}
            <Link
              className="font-inter font-medium
            bg-[#6469ff] text-white px-4 py-2 rounded-md "
            >
              {isAuthenticated ? (
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              ) : (
                <button onClick={() => loginWithRedirect()}>Log In</button>
              )}
            </Link>
          </>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
      <footer
        className="w-full flex justify-center items-center bg-white bg-transparent
    sm:px-8 px-4 py-4 border-t border-t-[#ebe6e4]"
      >
        <div className="flex justify-center item-center gap-2">
          <SocialIcon
            url="https://instagram.com/ishukha.n "
            bgColor="#ff5a01"
            style={{ width: 20, height: 20 }}
          />
          <SocialIcon
            url="https://github.com/ishukhan"
            bgColor="#fffff"
            style={{ width: 20, height: 20 }}
          />
          <SocialIcon
            url="https://www.linkedin.com/in/ishtiyakkhan/"
            style={{ width: 20, height: 20 }}
          />
        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;
