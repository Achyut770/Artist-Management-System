import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Artist from './pages/Artist';
import Song from './pages/Song';
import User from './pages/User';
import AddUser from './pages/AddUser';
import ProtectedRoute from './components/dashboard/ProtectedRoutes';
import EditUser from './pages/EditUser';
import ArtistAdd from './pages/ArtistAdd';
import EditArtist from './pages/EditArtist';

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
                <Route exact path="/" element={<User />} />
                <Route path="/users" element={<User />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users/edit/:userId" element={<EditUser />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['super_admin', 'artist_manager']} />}>
                <Route path="/artist" element={<Artist />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['artist_manager']} />}>
                <Route path="/artist/add" element={<ArtistAdd />} />
                <Route path="/artist/edit/:artistId" element={<EditArtist />} />
                <Route path="/artist/:artistId/songs" element={<Song />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['super_admin', 'artist_manager', "artist"]} />}>
                <Route path="/song/:artistId" element={<Song />} />
                <Route path="/song/:artistId/:songId" element={<Song />} />
            </Route>
            <Route path="*" element={<div>Cannnot Find the page</div>} />

        </Routes>
    );
};

export default Router;
