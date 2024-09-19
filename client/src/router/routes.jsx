import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Artist from '../pages/Artist';
import Song from '../pages/Song';
import User from '../pages/User';
import NotFound from '../components/error/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoutes';
import EditArtist from '../pages/Edit/EditArtist';
import EditSong from '../pages/Edit/EditSong';
import EditUser from '../pages/Edit/EditUser';
import AddArtist from '../pages/Add/AddArtist';
import AddUser from '../pages/Add/AddUser';
import AddSong from '../pages/Add/AddSong';

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
                <Route path="/artist/add" element={<AddArtist />} />
                <Route path="/artist/edit/:artistId" element={<EditArtist />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['artist_manager', 'super_admin', "artist"]} />}>
                <Route path="/artist/:artistId/songs" element={<Song />} />
                <Route path="/artist/:artistId/songs/edit/:songId" element={<EditSong />} />
                <Route path="/artist/:artistId/songs/add" element={<AddSong />} />
            </ Route>
            <Route path="/not-found" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default Router;
