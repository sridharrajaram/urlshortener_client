import React from "react";
import { Route, Routes } from "react-router-dom";
import ActivateAccount from "./ActivateAccount.js";
import Forgot from "./Forgot.js";
import Home from "./Home.js";
import Login from "./Login.js";
import OpenedEmail from "./OpenedEmail.js";
import RedirectToLong from "./RedirectToLong.js";
import SignUp from "./SignUp.js";
import UrlDashboard from "./UrlDashboard.js";
import UrlShortener from "./UrlShortener.js";
import UrlTable from "./UrlTable.js";

function RoutesBar({ loginState, setLoginState, token, setToken, email, setEmail }) {
  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login setLoginState={setLoginState}/>} />
        <Route path="/Forgot" element={<Forgot email={email} setEmail={setEmail}/>} />
        <Route
          path="/retrieveAccount/:email/:token"
          element={<OpenedEmail />}
        />
        <Route
          path="/activateAccount/:email/:token"
          element={<ActivateAccount />}
        />
        {loginState === "success" ? (
          <>
            {" "}
            <Route path="/urlDashboard" element={<UrlDashboard />} />
            <Route path="/urlShortener" element={<UrlShortener />} />
            <Route path="/urlTable" element={<UrlTable />} />
          </>
        ) : (
          ""
        )}
        <Route path="/:short" element={<RedirectToLong />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default RoutesBar;
