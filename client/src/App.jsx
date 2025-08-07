import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import Call from "./pages/Call.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import { Toaster } from "react-hot-toast";
import Notifications from "./pages/Notifications.jsx";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import Friends from "./pages/Friends.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Homepage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated && !isOnboarded ? <Login /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated && !isOnboarded ? (
              <Signup />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/chat"
          element={
            isAuthenticated && isOnboarded ? (
              <Chat />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Friends />
              </Layout>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <Call /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated && !isOnboarded ? (
              <Onboarding />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
