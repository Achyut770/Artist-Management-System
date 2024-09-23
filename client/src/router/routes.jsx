import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Artist from "../pages/Artist";
import Song from "../pages/Song";
import User from "../pages/User";
import NotFound from "../components/error/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoutes";
import EditArtist from "../pages/Edit/EditArtist";
import EditSong from "../pages/Edit/EditSong";
import EditUser from "../pages/Edit/EditUser";
import AddArtist from "../pages/Add/AddArtist";
import AddUser from "../pages/Add/AddUser";
import AddSong from "../pages/Add/AddSong";
import MySongs from "../pages/MySongs";

const routes = [
  { path: "/login", element: <Login />, roles: [] },
  { path: "/register", element: <Register />, roles: [] },
  {
    path: "/",
    element: <User />,
    roles: ["super_admin"],
    exact: true,
  },
  {
    path: "/users",
    element: <User />,
    roles: ["super_admin"],
  },
  {
    path: "/users/add",
    element: <AddUser />,
    roles: ["super_admin"],
  },
  {
    path: "/users/edit/:userId",
    element: <EditUser />,
    roles: ["super_admin"],
  },
  {
    path: "/artist",
    element: <Artist />,
    roles: ["super_admin", "artist_manager"],
  },
  {
    path: "/artist/add",
    element: <AddArtist />,
    roles: ["artist_manager"],
  },
  {
    path: "/artist/edit/:artistId",
    element: <EditArtist />,
    roles: ["artist_manager"],
  },
  {
    path: "/mysong",
    element: <MySongs />,
    roles: ["artist"],
  },
  {
    path: "/mysong/edit/:songId",
    element: <EditSong />,
    roles: ["artist"],
  },
  {
    path: "/mysong/add",
    element: <AddSong />,
    roles: ["artist"],
  },
  {
    path: "/artist/:artistId/songs",
    element: <Song />,
    roles: ["artist_manager", "super_admin"],
  },
  { path: "/not-found", element: <NotFound />, roles: [] },
  { path: "*", element: <NotFound />, roles: [] },
];

const Router = () => {
  return (
    <Routes>
      {routes.map(({ path, element, roles }) => (
        <Route
          key={path}
          path={path}
          element={
            roles.length > 0 ? (
              <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
            ) : (
              element
            )
          }
        />
      ))}
    </Routes>
  );
};

export default Router;
